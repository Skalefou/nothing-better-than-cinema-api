import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUsersDto } from "../dtos/RegisterUsers.dto";
import { SanitarizedUsersDTO } from "../dtos/SanitarizedUsersDTO";
import { RegisterUsersUseCase } from "../../application/use-cases/register-users.use-case";

@Controller("user")
export class UsersController {
  constructor(private readonly registerUsersUseCase: RegisterUsersUseCase) {}

  @Post("register")
  async registerUser(
    @Body() registerUserInput: RegisterUsersDto,
  ): Promise<SanitarizedUsersDTO> {
    const newUser = await this.registerUsersUseCase.execute(
      registerUserInput.email,
      registerUserInput.password,
    );
    return new SanitarizedUsersDTO(newUser);
  }
}
