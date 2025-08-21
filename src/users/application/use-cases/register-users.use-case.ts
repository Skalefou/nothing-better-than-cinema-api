import { Users } from "../../domain/entities/users.entity";
import { Inject, Injectable } from "@nestjs/common";
import { USERS_REPOSITORY, UsersRepository } from "../../domain/repositories/users.repository";
import { ExistingEmailException } from "../../domain/exceptions/ExistingEmail.exception";
import { InvalidEmailException } from "../../domain/exceptions/InvalidEmail.exception";
import { InvalidPasswordException } from "../../domain/exceptions/InvalidPassword.exception";
import {
    HASH_PASSWORD_SERVICE,
    HashPasswordService,
} from "../../domain/services/HashPassword.services";
import { JwtTokenService } from "src/auth/application/services/jwt-token.service";
import { CreatingUserException } from "../../domain/exceptions/CreatingUser.exception";
import { RoleActor } from "src/commons/enum/roles.enum";

@Injectable()
export class RegisterUsersUseCase {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,

        @Inject(HASH_PASSWORD_SERVICE)
        private readonly hashPasswordService: HashPasswordService,

        private readonly jwtTokenService: JwtTokenService
    ) {}

    private isValidEmail(email: string): boolean {
        if (email.length > 320) {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidPassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    async execute(
        email: string,
        password: string
    ): Promise<{ user: Users; accessToken: string; refreshToken: string }> {
        if (!this.isValidEmail(email)) {
            throw new InvalidEmailException();
        }

        if (!this.isValidPassword(password)) {
            throw new InvalidPasswordException();
        }

        const existingMailUser = await this.usersRepository.findByEmail(email);
        if (existingMailUser) {
            throw new ExistingEmailException();
        }

        const hashedPassword = await this.hashPasswordService.hashPassword(password);

        const user = new Users(null, email, [RoleActor.Users], hashedPassword, undefined, undefined);
        const newUser = await this.usersRepository.create(user);
        if (!newUser.id) {
            throw new CreatingUserException();
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtTokenService.generateAccessToken(newUser.id, newUser.role),
            this.jwtTokenService.generateRefreshToken(newUser.id),
        ]);

        newUser.password = null;
        return { user: newUser, accessToken, refreshToken };
    }
}
