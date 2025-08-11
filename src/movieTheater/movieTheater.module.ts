import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieTheaterController } from "./presentation/controllers/movieTheater.controller";
import { CreateMovieTheaterUseCase } from "./application/use-cases/create-movie-theater.use-case";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [MovieTheaterController],
    providers: [/*CreateMovieTheaterUseCase*/],
    exports: [
        /*TypeOrmModule*/
    ],
})
export class MovieTheaterModule {}
