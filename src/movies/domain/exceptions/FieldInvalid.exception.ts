import { BadRequestException } from "@nestjs/common";

export class FieldInvalidException extends BadRequestException {
    constructor() {
        super("One or more fields are invalid or missing.");
    }
}
