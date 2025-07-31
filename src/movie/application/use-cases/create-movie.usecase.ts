import { Inject, Injectable } from "@nestjs/common";
import { Movie } from "../../domain/entities/movie.entity";
import {
  MOVIE_REPOSITORY,
  MovieRepository,
} from "../../domain/repositories/movie.repository";

@Injectable()
export class CreateMovieUsecase {
  constructor(
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(
    title: string,
    director: string,
    releaseDate: Date,
    genre: string,
    cast: string[],
  ): Promise<Movie> {
    const movie = new Movie("", title, director, releaseDate, genre, cast);
    return await this.movieRepository.create(movie);
  }
}
