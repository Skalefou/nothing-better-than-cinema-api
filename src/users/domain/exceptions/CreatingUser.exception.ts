import { InternalServerErrorException } from "@nestjs/common";

export class CreatingUserException extends InternalServerErrorException {
  constructor() {
    super("User was not created cause a server error occurred.");
  }
}
