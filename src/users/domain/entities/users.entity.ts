export class Users {
    constructor(
        public readonly id: string | null,
        public readonly email: string,
        public readonly role: string[],
        public password: string | null,
        public readonly registerDate?: Date,
        public readonly lastLoginDate?: Date
    ) {}
}
