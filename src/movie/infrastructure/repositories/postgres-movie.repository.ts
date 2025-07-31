import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "../../domain/entities/movie.entity";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { MoviePostgresSchema } from "../schemas/movie.schema-postgres";

@Injectable()
export class PostgresMovieRepository implements MovieRepository {
  constructor(
    @InjectRepository(MoviePostgresSchema)
    private readonly movieRepository: Repository<MoviePostgresSchema>,
  ) {}

  private toSchema(movie: Movie): MoviePostgresSchema {
    return new MoviePostgresSchema(
      movie.id,
      movie.title,
      movie.director,
      movie.releaseDate,
      movie.genre,
      movie.cast,
    );
  }

  private toDomain(schema: MoviePostgresSchema): Movie {
    return new Movie(
      schema.id,
      schema.title,
      schema.director,
      schema.releaseDate,
      schema.genre,
      schema.cast,
    );
  }

  async create(movie: Movie): Promise<Movie> {
    const movieSchema = this.toSchema(movie);
    const savedSchema = await this.movieRepository.save(movieSchema);
    return this.toDomain(savedSchema);
  }
}
