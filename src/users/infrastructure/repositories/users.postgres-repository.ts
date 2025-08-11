import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { UsersSchemaPostgres } from "../schemas/users.schema-postgres";
import { Users } from "src/users/domain/entities/users.entity";

@Injectable()
export class UsersPostgresRepository implements UsersRepository {
    constructor(
        @InjectRepository(UsersSchemaPostgres)
        private readonly movieRepository: Repository<UsersSchemaPostgres>
    ) {}

    private toEntity(userSchema: UsersSchemaPostgres): Users {
        return new Users(
            userSchema.id,
            userSchema.email,
            userSchema.role,
            userSchema.password as string,
            userSchema.register_date ? new Date(userSchema.register_date) : undefined,
            userSchema.last_login_date ? new Date(userSchema.last_login_date) : undefined
        );
    }

    private toSchema(user: Users): UsersSchemaPostgres {
        return new UsersSchemaPostgres(
            user.id,
            user.email,
            user.role,
            user.password,
            user.registerDate,
            user.lastLoginDate
        );
    }

    async create(user: Users): Promise<Users> {
        const userSchema = this.toSchema(user);
        return this.movieRepository.save(userSchema).then((savedUser) => this.toEntity(savedUser));
    }

    async findById(id: string): Promise<Users | null> {
        return this.movieRepository
            .findOne({
                where: { id },
            })
            .then((userSchema) => (userSchema ? this.toEntity(userSchema) : null));
    }

    async findByEmail(email: string): Promise<Users | null> {
        const users: UsersSchemaPostgres[] = await this.movieRepository.manager.query(
            'SELECT * FROM "users" WHERE email = $1 LIMIT 1',
            [email]
        );
        if (users.length === 0) return null;
        return this.toEntity(users[0]);
    }

    async updateLastLoginDate(userId: string): Promise<Users | null> {
        const now = new Date();
        await this.movieRepository.manager.query(
            'UPDATE "users" SET "last_login_date" = $1 WHERE "id" = $2',
            [now, userId]
        );
        const users: UsersSchemaPostgres[] = await this.movieRepository.manager.query(
            'SELECT * FROM "users" WHERE "id" = $1 LIMIT 1',
            [userId]
        );
        if (!users || users.length === 0) return null;
        return this.toEntity(users[0]);
    }
}
