import { Module } from "@nestjs/common";
import { MovieController } from "./presentation/controllers/movie.controller";
import { CreateMovieUsecase } from "./application/use-cases/create-movie.usecase";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresMovieRepository } from "./infrastructure/repositories/postgres-movie.repository";
import { MOVIE_REPOSITORY } from "./domain/repositories/movie.repository";
import { MoviePostgresSchema } from "./infrastructure/schemas/movie.schema-postgres";

@Module({
  imports: [TypeOrmModule.forFeature([MoviePostgresSchema])],
  controllers: [MovieController],
  providers: [
    CreateMovieUsecase,
    {
      provide: MOVIE_REPOSITORY,
      useClass: PostgresMovieRepository,
    },
  ],
  exports: [TypeOrmModule],
})
export class MovieModule {}
