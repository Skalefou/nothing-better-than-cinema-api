import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Movie } from "../../domain/entities/movie.entity";
import { Injectable } from "@nestjs/common";

@Entity("movies")
@Injectable()
export class MoviePostgresSchema implements Movie {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255, nullable: false })
    title: string;

    @Column({ length: 255, nullable: false })
    director: string;

    @Column({ type: "date", nullable: false })
    releaseDate: Date;

    @Column({ length: 50, nullable: false })
    genre: string;

    @Column({ type: "simple-array", nullable: true })
    cast: string[];

    constructor(
        id: string | null,
        title: string,
        director: string,
        releaseDate: Date,
        genre: string,
        cast: string[],
    ) {
        if (id) {
            this.id = id;
        }
        this.title = title;
        this.director = director;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.cast = cast;
    }
}
