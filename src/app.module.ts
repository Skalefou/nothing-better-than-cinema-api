import { Module } from "@nestjs/common";
import { MovieModule } from "./movies/movie.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MovieTheaterModule } from "./movieTheater/movieTheater.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "node:path";
import * as process from "node:process";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env",
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("POSTGRES_HOST"),
                port: configService.get<number>("POSTGRES_PORT"),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DB"),
                synchronize: true,
                autoLoadEntities: true,
            }),
        }),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => {
                const dir = cfg.get<string>("UPLOADS_DIR", "uploads");
                return {
                    storage: diskStorage({
                        destination: path.join(process.cwd(), dir),
                        filename: (
                            req: Express.Request,
                            file: Express.Multer.File,
                            cb: (error: Error | null, filename: string) => void
                        ) => {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            const filename = `${Date.now()}-${file.originalname}`;
                            cb(null, filename);
                        },
                    }),
                    limits: {
                        fileSize: (cfg.get<number>("MAX_IMAGE_SIZE_MB") ?? 10) * 1024 * 1024,
                    },
                };
            },
        }),
        MovieModule,
        UsersModule,
        MovieTheaterModule,
        AuthModule,
    ],
})
export class AppModule {}
