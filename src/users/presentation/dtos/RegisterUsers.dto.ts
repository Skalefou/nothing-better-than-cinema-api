import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUsersDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(320, {
        message: "L'email ne peut pas dépasser 320 caractères",
    })
    @ApiProperty({ example: "example@mail.com" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre",
    })
    @ApiProperty({
        example: "Password123",
        description:
            "Doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre",
    })
    password: string;
}
