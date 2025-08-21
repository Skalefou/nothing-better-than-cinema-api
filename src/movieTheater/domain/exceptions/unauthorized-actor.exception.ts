import { UnauthorizedException } from "@nestjs/common";

export class UnauthorizedActorException extends UnauthorizedException {
    constructor() {
        super(`Unauthorized user`);
    }
}