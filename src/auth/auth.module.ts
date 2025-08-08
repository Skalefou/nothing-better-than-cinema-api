import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenServiceImpl } from "./infrastructure/services/jwt-token-service-impl.service";
import { JwtTokenService } from "./application/services/jwt-token.service";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./infrastructure/strategies/jwt.strategy";

@Module({
    imports: [
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
    ],
    exports: [JwtTokenService],
})
export class AuthModule {}
