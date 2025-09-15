import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsersSchemaPostgres } from "../../../users/infrastructure/schemas/users.schema-postgres";
import { MovieTheaterSchemaPostgres } from "./movieTheater.schema-postgres";

@Entity("movie_theater_image")
export class MovieTheaterImageSchemaPostgres {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ManyToOne(() => UsersSchemaPostgres, (user) => user.movieTheaterImages, { nullable: false })
    @JoinColumn({ name: "author_id" })
    public readonly author: UsersSchemaPostgres;

    @ManyToOne(() => MovieTheaterSchemaPostgres, (movieTheater) => movieTheater.images, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "movie_theater_id" })
    public readonly movieTheater: MovieTheaterSchemaPostgres;

    @Column({ type: "varchar", length: 512, nullable: false })
    public readonly url: string;

    @Column({
        name: "publication_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    })
    public readonly publicationDate: Date;

    constructor(
        id: string | null,
        author: UsersSchemaPostgres,
        movieTheater: MovieTheaterSchemaPostgres,
        url: string,
        publicationDate?: Date
    ) {
        if (id) this.id = id;
        this.author = author;
        this.movieTheater = movieTheater;
        this.url = url;
        this.publicationDate = publicationDate ? new Date(publicationDate) : new Date();
    }
}
