import { ActorContext } from "../contexts/actor.context";
import { Injectable, Inject } from "@nestjs/common";
import { MovieTheater } from "../../domain/entities/movieTheater.entity";
import { MOVIE_THEATER_REPOSITORY, MovieTheaterRepository } from "../../domain/repositories/movieTheater.repository";
import {NotFoundMovieTheaterException} from "../../domain/exceptions/notFoundMovieTheater.exception";
import {MovieTheaterImage} from "../../domain/entities/movieTheater-image.entity";

@Injectable()
export class UpdateMovieTheaterUseCase {
    constructor(
        @Inject(MOVIE_THEATER_REPOSITORY)
        private readonly movieTheaterRepository: MovieTheaterRepository
    ) {}

    async execute(
        id: string,
        name: string,
        description: string,
        type: string,
        capacity: number,
        disabledAccess: boolean,
        imagesUrl: string[],
        actor: ActorContext
    ): Promise<MovieTheater> {
        const existingMovieTheater = await this.movieTheaterRepository.findById(id);
        if (!existingMovieTheater) {
            throw new NotFoundMovieTheaterException(id);
        }

        const movieTheaterImage: MovieTheaterImage[] = imagesUrl.map(
            (url) => new MovieTheaterImage(null, actor.id, url, new Date())
        );

        const updatedMovieTheater = new MovieTheater(
            id,
            name,
            description,
            type,
            capacity,
            disabledAccess,
            movieTheaterImage
        );
        return await this.movieTheaterRepository.update(updatedMovieTheater);
    }
}