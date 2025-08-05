import { BadRequestException } from "@nestjs/common";

export class InvalidEmailException extends BadRequestException {
    constructor() {
        super("The provided email is invalid.");
    }
}
