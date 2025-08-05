import { InternalServerErrorException } from "@nestjs/common";

export class InternalServerErrorUsersException extends InternalServerErrorException {
    constructor() {
        super(
            "Internal server error occurred while processing the request for users.",
        );
    }
}
