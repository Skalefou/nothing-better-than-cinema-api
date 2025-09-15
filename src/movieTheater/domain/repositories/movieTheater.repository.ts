import { MovieTheater } from "../entities/movieTheater.entity";

export const MOVIE_THEATER_REPOSITORY = "MOVIE_THEATER_REPOSITORY";

export interface MovieTheaterRepository {
    create(movieTheater: MovieTheater): Promise<MovieTheater>;
}
