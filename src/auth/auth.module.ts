import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtTokenServiceImpl } from "./infrastructure/services/jwt-token-service-impl.service";
import { JwtTokenService } from "./application/services/jwt-token.service";
import { AuthService } from "./application/services/auth.service";
import { AttachUserGuard } from "./presentation/guards/attach-user.guard";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./infrastructure/strategies/jwt.strategy";
import { UsersPostgresRepository } from "../users/infrastructure/repositories/users.postgres-repository";
import { USERS_REPOSITORY_AUTH } from "./domain/repositories/users.repository";
import { UsersSchemaPostgres } from "../users/infrastructure/schemas/users.schema-postgres";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersSchemaPostgres]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("JWT_ACCESS_EXPIRES_IN", "15m"),
                },
            }),
        }),
    ],
    providers: [
        JwtTokenServiceImpl,
        {
            provide: JwtTokenService,
            useFactory: (impl: JwtTokenServiceImpl, configService: ConfigService) =>
                new JwtTokenService(impl, configService),
            inject: [JwtTokenServiceImpl, ConfigService],
        },
        JwtStrategy,
        {
            provide: USERS_REPOSITORY_AUTH,
            useClass: UsersPostgresRepository,
        },
        AuthService,
        AttachUserGuard,
    ],
    exports: [JwtTokenService, AuthService, AttachUserGuard],
})
export class AuthModule {}
