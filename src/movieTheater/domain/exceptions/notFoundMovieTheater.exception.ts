import { NotFoundException } from "@nestjs/common";

export class NotFoundMovieTheaterException extends NotFoundException {
    constructor(id: string) {
        super(`Movie theater with id ${id} not found`);
    }
}
