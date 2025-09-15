import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MovieTheaterImageSchemaPostgres } from "../../../movieTheater/infrastructure/schemas/movieTheater-image.schema-postgres";

@Entity("users")
export class UsersSchemaPostgres {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column({ type: "varchar", length: 320, unique: true })
    public readonly email: string;

    @Column({ type: "jsonb", default: () => "'[]'" })
    public readonly role: string[];

    @Column({ type: "varchar", length: 64, nullable: false })
    public password: string | null;

    @Column({
        name: "register_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public readonly register_date?: Date;

    @Column({
        name: "last_login_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    public readonly last_login_date?: Date;

    @OneToMany(
        () => MovieTheaterImageSchemaPostgres,
        (movieTheaterImage) => movieTheaterImage.author
    )
    public readonly movieTheaterImages: MovieTheaterImageSchemaPostgres[];

    constructor(
        id: string | null,
        email: string,
        role: string[],
        password: string | null,
        registerDate?: Date,
        lastLoginDate?: Date
    ) {
        if (id) {
            this.id = id;
        }
        this.email = email;
        this.role = role;
        this.password = password;
        this.register_date = registerDate ? new Date(registerDate) : undefined;
        this.last_login_date = lastLoginDate ? new Date(lastLoginDate) : undefined;
    }
}
