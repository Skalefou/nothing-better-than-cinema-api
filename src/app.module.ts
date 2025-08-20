import { Module } from "@nestjs/common";
import { MovieModule } from "./movies/movie.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MovieTheaterModule } from "./movieTheater/movieTheater.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "node:path";
import { ServeStaticModule } from "@nestjs/serve-static";

const uploadDir = join(process.cwd(), "uploads");

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

        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), "uploads"),
            serveRoot: "/uploads",
        }),

        MovieModule,
        UsersModule,
        MovieTheaterModule,
        AuthModule,
    ],
})
export class AppModule {}
