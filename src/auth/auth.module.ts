import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenServiceImpl } from "./infrastructure/services/jwt-token-service-impl.service";
import { JwtTokenService } from "./application/services/jwt-token.service";

@Module({
  imports: [
    JwtModule.register({ secret: "secret", signOptions: { expiresIn: "1h" } }),
  ],
  providers: [
    JwtTokenServiceImpl,
    {
      provide: JwtTokenService,
      useFactory: (impl: JwtTokenServiceImpl) => new JwtTokenService(impl),
      inject: [JwtTokenServiceImpl],
    },
  ],
  exports: [JwtTokenService],
})
export class AuthModule {}
