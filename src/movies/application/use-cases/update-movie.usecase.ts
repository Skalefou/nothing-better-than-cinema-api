import { MOVIE_REPOSITORY, MovieRepository } from "../../domain/repositories/movie.repository";
import { Movie } from "../../domain/entities/movie.entity";
import { Inject } from "@nestjs/common";
import { InvalidIdException } from "../../domain/exceptions/InvalidId.exception";
import { FieldInvalidException } from "../../domain/exceptions/FieldInvalid.exception";

export class UpdateMovieUsecase {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository
    ) {}

    async execute(
        id: string,
        title: string,
        director: string,
        releaseDate: Date,
        genre: string,
        cast: string[]
    ): Promise<Movie> {
        if (!id) {
            throw new InvalidIdException();
        }
        const existingMovie = await this.movieRepository.findById(id);
        if (!existingMovie) {
            throw new InvalidIdException();
        }

        if (!title || !director || !releaseDate || !genre || !cast) {
            throw new FieldInvalidException();
        }

        const movie = new Movie(id, title, director, releaseDate, genre, cast);
        return await this.movieRepository.update(movie);
    }
}
