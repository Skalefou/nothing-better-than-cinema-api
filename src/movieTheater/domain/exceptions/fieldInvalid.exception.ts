import { BadRequestException } from "@nestjs/common";

export class FieldInvalidException extends BadRequestException {
    constructor(field: string, message: string) {
        super(`Invalid field: ${field}. ${message}`);
    }
}
