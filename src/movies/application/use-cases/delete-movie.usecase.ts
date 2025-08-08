import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../../domain/repositories/movie.repository";

@Injectable()
export class DeleteMovieUsecase {
    constructor(private reado0nly movieRepository: MovieRepository) {}

    async execute(id: string): Promise<void> {
        await this.movieRepository.delete(id);
    }
}
