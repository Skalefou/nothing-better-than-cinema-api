import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateMovieUsecase } from "../../application/use-cases/create-movie.usecase";
import { Movie } from "../../domain/entities/movie.entity";
import { CreateMovieDTO } from "../dtos/create-movie.dto";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { Role } from "../../../users/domain/entities/roles.enum";

@Controller("movies")
export class MovieController {
    constructor(private readonly createMovieUsecase: CreateMovieUsecase) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async createMovie(@Body() createMovieInput: CreateMovieDTO): Promise<Movie> {
        return await this.createMovieUsecase.execute(
            createMovieInput.title,
            createMovieInput.director,
            createMovieInput.releaseDate,
            createMovieInput.genre,
            createMovieInput.cast
        );
    }
}
