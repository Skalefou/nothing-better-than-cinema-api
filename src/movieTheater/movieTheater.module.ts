import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieTheaterController } from "./presentation/controllers/movieTheater.controller";
import { CreateMovieTheaterUseCase } from "./application/use-cases/create-movie-theater.use-case";
import { AuthModule } from "../auth/auth.module";
import { MovieTheaterImageSchemaPostgres } from "./infrastructure/schemas/movieTheater-image.schema-postgres";
import { MovieTheaterSchemaPostgres } from "./infrastructure/schemas/movieTheater.schema-postgres";
import { MOVIE_THEATER_REPOSITORY } from "./domain/repositories/movieTheater.repository";
import { MovieTheaterPostgresRepository } from "./infrastructure/repositories/movieTheater.postgres-repository";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([MovieTheaterSchemaPostgres]),
        TypeOrmModule.forFeature([MovieTheaterImageSchemaPostgres]),
    ],
    controllers: [MovieTheaterController],
    providers: [
        CreateMovieTheaterUseCase,
        {
            provide: MOVIE_THEATER_REPOSITORY,
            useClass: MovieTheaterPostgresRepository,
        },
    ],
    exports: [TypeOrmModule],
})
export class MovieTheaterModule {}
