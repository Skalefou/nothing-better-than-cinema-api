import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Movie } from "../../domain/entities/movie.entity";
import { Injectable } from "@nestjs/common";

@Entity()
@Injectable()
export class MoviePostgresSchema implements Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  releaseDate: Date;

  @Column()
  genre: string;

  @Column("simple-array")
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
