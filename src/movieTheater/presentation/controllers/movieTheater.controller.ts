import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { Role } from "../../../users/domain/entities/roles.enum";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { AttachUser } from "../../../auth/presentation/decorators/attach-user.decorator";
import { Users } from "../../../users/domain/entities/users.entity";
import { AttachUserGuard } from "../../../auth/presentation/guards/attach-user.guard";
import { CreateMovieTheaterDTO } from "../dtos/createMovieTheater.dto";
import { CreateMovieTheaterUseCase } from "../../application/use-cases/create-movie-theater.use-case";

@Controller("movie-theater")
export class MovieTheaterController {
    constructor(private readonly createMovieTheaterUsecase: CreateMovieTheaterUseCase) {}

    @Post()
    @UseGuards(JwtAuthGuard, AttachUserGuard, RolesGuard)
    @Roles(Role.Admin)
    async createMovieTheater(
        @AttachUser() user: Users,
        @Body() createMovieTheaterInput: CreateMovieTheaterDTO
    ): Promise<void> {
        const a = 5;
        console.log(user, a);
    }
}
