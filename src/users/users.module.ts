import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./presentation/controllers/users.controller";
import { RegisterUsersUseCase } from "./application/use-cases/register-users.use-case";
import { HASH_PASSWORD_SERVICE } from "./domain/services/HashPassword.services";
import { BcryptHashPasswordService } from "./infrastructure/services/BcryptHashPassword.service";
import { UsersSchemaPostgres } from "./infrastructure/schemas/users.schema-postgres";
import { USERS_REPOSITORY } from "./domain/repositories/users.repository";
import { UsersPostgresRepository } from "./infrastructure/repositories/users.postgres-repository";

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchemaPostgres])],
  controllers: [UsersController],
  providers: [
    RegisterUsersUseCase,
    {
      provide: HASH_PASSWORD_SERVICE,
      useClass: BcryptHashPasswordService,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersPostgresRepository,
    },
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
