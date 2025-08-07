import { JwtServicePort } from "../../domain/interfaces/jwt.service";
import { ConfigService } from "@nestjs/config";

export class JwtTokenService {
    private readonly configService: ConfigService;

    constructor(
        private readonly jwtTokenService: JwtServicePort,
        configService: ConfigService
    ) {
        this.configService = configService;
    }

    async generateAccessToken(userId: string, roles: string[]): Promise<string> {
        return this.jwtTokenService.sign(
            {
                sub: userId,
                roles,
            },
            {
                expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES_IN", "15m"),
            }
        );
    }

    async generateRefreshToken(userId: string): Promise<string> {
        return this.jwtTokenService.sign(
            { sub: userId },
            {
                expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN", "60d"),
            }
        );
    }
}
