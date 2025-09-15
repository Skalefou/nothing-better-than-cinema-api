import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovieTheaterSchemaPostgres } from "../schemas/movieTheater.schema-postgres";
import { MovieTheaterImageSchemaPostgres } from "../schemas/movieTheater-image.schema-postgres";
import { MovieTheater } from "../../domain/entities/movieTheater.entity";

import { MovieTheaterMapper } from "../mappers/movieTheater.mapper";
import { UsersSchemaPostgres } from "../../../users/infrastructure/schemas/users.schema-postgres";
import { MovieTheaterImageMapper } from "../mappers/movieTheater-image.mapper";

@Injectable()
export class MovieTheaterPostgresRepository {
    constructor(
        @InjectRepository(MovieTheaterSchemaPostgres)
        private readonly movieTheaterRepository: Repository<MovieTheaterSchemaPostgres>,

        @InjectRepository(MovieTheaterImageSchemaPostgres)
        private readonly movieTheaterImageRepository: Repository<MovieTheaterImageSchemaPostgres>
    ) {}

    async create(movieTheater: MovieTheater): Promise<MovieTheater> {
        const entity = MovieTheaterMapper.toPersistence(movieTheater);

        if (movieTheater.images && movieTheater.images.length > 0) {
            const images = movieTheater.images.map((img) => {
                const authorEntity = new UsersSchemaPostgres(img.author, "", [], null);
                return MovieTheaterImageMapper.toPersistence(img, authorEntity, entity);
            });
            (entity as unknown as { images: typeof images }).images = images;
        }
        const saved = await this.movieTheaterRepository.save(entity);
        return MovieTheaterMapper.toDomain(saved);
    }
}
