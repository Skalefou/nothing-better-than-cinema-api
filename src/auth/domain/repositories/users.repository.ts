import { Users } from "../../../users/domain/entities/users.entity";

export const USERS_REPOSITORY_AUTH = "USERS_REPOSITORY_AUTH";

export interface UsersRepository {
    findById(id: string): Promise<Users | null>;
}
