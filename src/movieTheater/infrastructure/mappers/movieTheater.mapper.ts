import { MovieTheater } from "src/movieTheater/domain/entities/movieTheater.entity";
import { MovieTheaterSchemaPostgres } from "../schemas/movieTheater.schema-postgres";
import { MovieTheaterImage } from "../../domain/entities/movieTheater-image.entity";

export class MovieTheaterMapper {
    static toDomain(entity: MovieTheaterSchemaPostgres): MovieTheater {
        return new MovieTheater(
            entity.id,
            entity.name,
            entity.description,
            entity.type,
            entity.capacity,
            entity.disabledAccess,
            entity.images?.map(
                (img) =>
                    new MovieTheaterImage(
                        img.id,
                        img.author.id,
                        img.url,
                        img.publicationDate,
                        entity.id
                    )
            ) || []
        );
    }

    static toPersistence(domain: MovieTheater): MovieTheaterSchemaPostgres {
        return new MovieTheaterSchemaPostgres(
            domain.id,
            domain.name,
            domain.description,
            domain.type,
            domain.capacity,
            domain.disabledAccess
        );
    }
}
