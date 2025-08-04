import { JwtServicePort } from "../../domain/interfaces/jwt.service";

export class JwtTokenService {
  constructor(private readonly jwtTokenService: JwtServicePort) {}

  async generateAccessToken(userId: string, roles: string[]): Promise<string> {
    return this.jwtTokenService.sign({
      sub: userId,
      roles,
    });
  }
}
