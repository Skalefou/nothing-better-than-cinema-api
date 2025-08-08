import { Inject, Injectable } from "@nestjs/common";
import { MOVIE_REPOSITORY, MovieRepository } from "../../domain/repositories/movie.repository";

@Injectable()
export class DeleteMovieUsecase {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.movieRepository.delete(id);
    }
}
