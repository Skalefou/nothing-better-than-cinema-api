import { Users } from "../entities/users.entity";

export const USERS_REPOSITORY = "USERS_REPOSITORY";

export interface UsersRepository {
  create(user: Users): Promise<Users>;
  findByEmail(email: string): Promise<Users | null>;
}
