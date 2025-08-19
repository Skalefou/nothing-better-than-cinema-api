import { Injectable } from "@nestjs/common";
import { MovieTheater } from "../../domain/entities/movieTheater.entity";

@Injectable()
export class CreateMovieTheaterUseCase {
    async execute(
        name: string,
        description: string,
        type: string,
        capacity: number,
        disabledAccess: boolean,
        images: string[],
        authorId: string
    ): Promise<void> {}
}
