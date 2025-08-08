import { JwtServicePort } from "../../domain/interfaces/jwt.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenServiceImpl implements JwtServicePort {
    constructor(private readonly jwt: JwtService) {}

    verify<T extends object = any>(token: string): T {
        return this.jwt.verify<T>(token);
    }

    sign(payload: object, options?: object): Promise<string> {
        return this.jwt.signAsync(payload, options);
    }
}
