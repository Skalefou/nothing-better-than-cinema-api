import { Injectable, Inject } from "@nestjs/common";
import { UsersRepository, USERS_REPOSITORY_AUTH } from "../../domain/repositories/users.repository";
import { Users } from "../../../users/domain/entities/users.entity";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_REPOSITORY_AUTH)
        private readonly usersRepository: UsersRepository
    ) {}

    async validateAndAttachUser(userId: string): Promise<Users> {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error("User not found in database");
        }
        user.password = null;
        return user;
    }
}
