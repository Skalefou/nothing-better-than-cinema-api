import { BadRequestException } from "@nestjs/common";

export class EmailAndPasswordNotFound extends BadRequestException {
    constructor() {
        super("Email and password not found.");
    }
}
