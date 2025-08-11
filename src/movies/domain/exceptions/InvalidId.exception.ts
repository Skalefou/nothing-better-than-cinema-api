import { NotFoundException } from "@nestjs/common";

export class InvalidIdException extends NotFoundException {
    constructor() {
        super("The provided ID is invalid or does not exist.");
    }
}
