import { Inject, Injectable } from "@nestjs/common";
import { MOVIE_REPOSITORY, MovieRepository } from "../../domain/repositories/movie.repository";
import { InvalidIdException } from "../../domain/exceptions/InvalidId.exception";

@Injectable()
export class DeleteMovieUsecase {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository
    ) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new InvalidIdException();
        }
        const existingMovie = await this.movieRepository.findById(id);
        if (!existingMovie) {
            throw new InvalidIdException();
        }

        await this.movieRepository.delete(id);
    }
}
