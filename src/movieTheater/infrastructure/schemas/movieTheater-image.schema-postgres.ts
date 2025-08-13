import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsersSchemaPostgres } from "../../../users/infrastructure/schemas/users.schema-postgres";

@Entity("movie_theater_image")
export class MovieTheaterImageSchemaPostgres {
    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ManyToOne(() => UsersSchemaPostgres, (user) => user.movieTheaterImages, { nullable: false })
    @JoinColumn({ name: "author_id" })
    public readonly authorId: UsersSchemaPostgres;

    @Column({ type: "varchar", length: 512, nullable: false })
    public readonly url: string;

    @Column({
        name: "publication_date",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
        update: false,
    })
    public readonly publicationDate: Date;

    constructor(
        id: string | null,
        authorId: UsersSchemaPostgres,
        url: string,
        publicationDate?: Date
    ) {
        if (id) {
            this.id = id;
        }
        this.authorId = authorId;
        this.url = url;
        this.publicationDate = publicationDate ? new Date(publicationDate) : new Date();
    }
}
