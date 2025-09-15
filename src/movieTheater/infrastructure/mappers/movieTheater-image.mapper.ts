import { MovieTheaterImage } from "../../domain/entities/movieTheater-image.entity";
import { MovieTheaterImageSchemaPostgres } from "../schemas/movieTheater-image.schema-postgres";
import { UsersSchemaPostgres } from "../../../users/infrastructure/schemas/users.schema-postgres";
import { MovieTheaterSchemaPostgres } from "../schemas/movieTheater.schema-postgres";

export class MovieTheaterImageMapper {
    static toPersistence(
        domain: MovieTheaterImage,
        author?: UsersSchemaPostgres,
        movieTheater?: MovieTheaterSchemaPostgres
    ): MovieTheaterImageSchemaPostgres {
        const authorEntity = author || new UsersSchemaPostgres(domain.author, "", [], null);
        if (!movieTheater)
            throw new Error("movieTheater entity is required for persistence mapping");
        return new MovieTheaterImageSchemaPostgres(
            domain.id,
            authorEntity,
            movieTheater,
            domain.url,
            domain.publicationDate
        );
    }
}
