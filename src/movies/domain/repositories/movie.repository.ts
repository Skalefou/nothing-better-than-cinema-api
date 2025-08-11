import { Movie } from "../entities/movie.entity";

export const MOVIE_REPOSITORY = "MOVIE_REPOSITORY";

export interface MovieRepository {
    findById(id: string): Promise<Movie | null>;
    create(movie: Movie): Promise<Movie>;
    delete(id: string): Promise<void>;
    update(movie: Movie): Promise<Movie>;
}
