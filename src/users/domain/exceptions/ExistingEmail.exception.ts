import { ConflictException } from "@nestjs/common";

export class ExistingEmailException extends ConflictException {
  constructor() {
    super("A user with this email already exists.");
  }
}
