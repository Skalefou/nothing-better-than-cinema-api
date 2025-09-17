import { Inject, Injectable } from "@nestjs/common";
import {
    MOVIE_THEATER_REPOSITORY,
    MovieTheaterRepository,
} from "../../domain/repositories/movieTheater.repository";
import { NotFoundMovieTheaterException } from "../../domain/exceptions/notFoundMovieTheater.exception";

@Injectable()
export class DeleteMovieTheaterUseCase {
    constructor(
        @Inject(MOVIE_THEATER_REPOSITORY)
        private readonly movieTheaterRepository: MovieTheaterRepository
    ) {}

    async execute(id: string): Promise<void> {
        const affectedRow = await this.movieTheaterRepository.delete(id);
        if (affectedRow === 0) {
            throw new NotFoundMovieTheaterException(id);
        }
    }
}
