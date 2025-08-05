import { Users } from "../../domain/entities/users.entity";

export class SanitarizedUsersDTO implements Omit<Users, "password"> {
    readonly email: string;
    readonly id: string | null;
    readonly lastLoginDate: Date | undefined;
    readonly registerDate: Date | undefined;
    readonly role: string[];

    constructor(users: Users) {
        this.id = users.id;
        this.email = users.email;
        this.registerDate = users.registerDate;
        this.lastLoginDate = users.lastLoginDate;
        this.role = users.role;
    }
}
