import { IsNotEmpty } from "class-validator";

export class LoginUsersDTO {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
