import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUsersUseCase } from "../../application/use-cases/register-users.use-case";
import { LoginUsersUseCase } from "../../application/use-cases/login-users.use-case";
import { LoginUsersDTO } from "../dtos/LoginUsers.dto";
import { RegisterUsersDTO } from "../dtos/RegisterUsers.dto";
import { SanitarizedUsersDTO } from "../dtos/SanitarizedUsers.dto";

@Controller("user")
export class UsersController {
    constructor(
        private readonly registerUsersUseCase: RegisterUsersUseCase,
        private readonly loginUsersUseCase: LoginUsersUseCase
    ) {}

    @Post("register")
    async registerUser(@Body() registerUserInput: RegisterUsersDTO): Promise<{
        user: SanitarizedUsersDTO;
        accessToken: string;
        refreshToken: string;
    }> {
        const {
            user: newUser,
            accessToken,
            refreshToken,
        } = await this.registerUsersUseCase.execute(
            registerUserInput.email,
            registerUserInput.password
        );

        return {
            user: new SanitarizedUsersDTO(newUser),
            accessToken,
            refreshToken,
        };
    }

    @Post("login")
    async loginUser(@Body() loginUserInput: LoginUsersDTO): Promise<{
        user: SanitarizedUsersDTO;
        accessToken: string;
        refreshToken: string;
    }> {
        const {
            user: loggedUser,
            accessToken,
            refreshToken,
        } = await this.loginUsersUseCase.execute(loginUserInput.email, loginUserInput.password);
        return {
            user: new SanitarizedUsersDTO(loggedUser),
            accessToken,
            refreshToken,
        };
    }
}
