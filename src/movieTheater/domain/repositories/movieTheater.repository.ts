import { MovieTheater } from "../entities/movieTheater.entity";

export const MOVIE_THEATER_REPOSITORY = "MOVIE_THEATER_REPOSITORY";

export interface MovieTheaterRepository {
    findById(id: string): Promise<MovieTheater | null>;
    create(movieTheater: MovieTheater): Promise<MovieTheater>;
    update(movieTheater: MovieTheater): Promise<MovieTheater>;

    // Return the number of affected rows
    delete(id: string): Promise<number>;
}
