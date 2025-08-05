import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Users } from "../../domain/entities/users.entity";

@Entity("users")
@Injectable()
export class UsersSchemaPostgres implements Users {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column({ type: "varchar", length: 320, unique: true })
    public readonly email: string;

    @Column("simple-array")
    public readonly role: string[];

    @Column({ type: "varchar", length: 64, nullable: false })
    public password: string | null;

    @Column({
        name: "register_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public readonly registerDate?: Date;

    @Column({
        name: "last_login_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public readonly lastLoginDate?: Date;

    constructor(
        id: string | null,
        email: string,
        role: string[],
        password: string | null,
        registerDate?: Date,
        lastLoginDate?: Date,
    ) {
        if (id) {
            this.id = id;
        }
        this.email = email;
        this.role = role;
        this.password = password;
        this.registerDate = registerDate ? new Date(registerDate) : undefined;
        this.lastLoginDate = lastLoginDate
            ? new Date(lastLoginDate)
            : undefined;
    }
}
