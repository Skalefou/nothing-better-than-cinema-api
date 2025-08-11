import { Injectable } from "@nestjs/common";
import { MovieTheater } from "../../domain/entities/movieTheater.entity";

@Injectable()
export class CreateMovieTheaterUseCase {
    async execute(): Promise<void> {}
}
