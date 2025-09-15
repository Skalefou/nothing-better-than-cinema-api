import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MovieTheaterImageSchemaPostgres } from "./movieTheater-image.schema-postgres";

@Entity("movie_theater")
export class MovieTheaterSchemaPostgres {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column({ type: "varchar", length: 128, nullable: false })
    public readonly name: string;

    @Column({ type: "varchar", length: 128, nullable: false })
    public readonly description: string;

    @Column({ type: "varchar", length: 128, nullable: false })
    public readonly type: string;

    @Column({ type: "int", nullable: false })
    public readonly capacity: number;

    @Column({ type: "boolean", default: false })
    public readonly disabledAccess: boolean;

    @OneToMany(() => MovieTheaterImageSchemaPostgres, (image) => image.movieTheater, {
        cascade: true,
    })
    public readonly images: MovieTheaterImageSchemaPostgres[];

    constructor(
        id: string | null,
        name: string,
        description: string,
        type: string,
        capacity: number,
        disabledAccess: boolean = false
    ) {
        if (id) this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.capacity = capacity;
        this.disabledAccess = disabledAccess;
    }
}
