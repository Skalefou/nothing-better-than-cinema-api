import { Inject, Injectable } from "@nestjs/common";
import { Users } from "../../domain/entities/users.entity";
import { USERS_REPOSITORY, UsersRepository } from "../../domain/repositories/users.repository";
import { InvalidEmailException } from "../../domain/exceptions/InvalidEmail.exception";
import {
    HASH_PASSWORD_SERVICE,
    HashPasswordService,
} from "../../domain/services/HashPassword.services";
import { EmailAndPasswordNotFound } from "../../domain/exceptions/EmailAndPasswordInvalid.exception";
import { InvalidPasswordException } from "../../domain/exceptions/InvalidPassword.exception";
import { JwtTokenService } from "../../../auth/application/services/jwt-token.service";
import { InternalServerErrorUsersException } from "../../domain/exceptions/InternalServerErrorUsers.exception";

@Injectable()
export class LoginUsersUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,

        @Inject(HASH_PASSWORD_SERVICE)
        private readonly hashPasswordService: HashPasswordService,

        private readonly jwtTokenService: JwtTokenService
    ) {}

    async execute(
        email: string,
        password: string
    ): Promise<{
        user: Users;
        accessToken: string;
        refreshToken: string;
    }> {
        if (!email || !password) {
            throw new EmailAndPasswordNotFound();
        }

        const user = await this.usersRepository.findByEmail(email);
        if (!user || !user.password || !user.id) {
            throw new InvalidEmailException();
        }

        const isPasswordValid = await this.hashPasswordService.comparePassword(
            password,
            user.password
        );
        if (!isPasswordValid) {
            throw new InvalidPasswordException();
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtTokenService.generateAccessToken(user.id, user.role),
            this.jwtTokenService.generateRefreshToken(user.id),
        ]);

        const returnUser = await this.usersRepository.updateLastLoginDate(user.id);
        if (!returnUser) {
            throw new InternalServerErrorUsersException();
        }

        user.password = null;
        return { user: user, accessToken, refreshToken };
    }
}
