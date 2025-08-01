import { Body, Controller, Post } from "@nestjs/common";
import { CreateMovieUsecase } from "../../application/use-cases/create-movie.usecase";
import { Movie } from "../../domain/entities/movie.entity";
import { CreateMovieDTO } from "../dtos/create-movie.dto";

@Controller("movies")
export class MovieController {
  constructor(private readonly createMovieUsecase: CreateMovieUsecase) {}

  @Post()
  async createMovie(@Body() createMovieInput: CreateMovieDTO): Promise<Movie> {
    return await this.createMovieUsecase.execute(
      createMovieInput.title,
      createMovieInput.director,
      createMovieInput.releaseDate,
      createMovieInput.genre,
      createMovieInput.cast,
    );
  }
}
