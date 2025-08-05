import { Movie } from "../entities/movie.entity";

export const MOVIE_REPOSITORY = "MOVIE_REPOSITORY";

export interface MovieRepository {
    create(movie: Movie): Promise<Movie>;
}
