import { Inject, Injectable } from "@nestjs/common";
import { ActorContext } from "../contexts/actor.context";
import { RoleActor } from "../../../commons/enum/roles.enum";
import { FieldInvalidException } from "../../domain/exceptions/fieldInvalid.exception";
import { UnauthorizedActorException } from "../../domain/exceptions/unauthorized-actor.exception";
import { MovieTheaterImage } from "../../domain/entities/movieTheater-image.entity";
import { MovieTheater } from "../../domain/entities/movieTheater.entity";
import { TooMuchImagesException } from "../../domain/exceptions/tooMuchImages.exception";
import {
    MOVIE_THEATER_REPOSITORY,
    MovieTheaterRepository,
} from "../../domain/repositories/movieTheater.repository";

@Injectable()
export class CreateMovieTheaterUseCase {
    constructor(
        @Inject(MOVIE_THEATER_REPOSITORY)
        private readonly movieTheaterRepository: MovieTheaterRepository
    ) {}

    private verifyValidtyMovieTheater(
        name: string,
        description: string,
        type: string,
        capacity: number,
        actor: ActorContext
    ) {
        if (!actor.roles.includes(RoleActor.Admin)) {
            throw new UnauthorizedActorException();
        }

        if (name.length < 3) {
            throw new FieldInvalidException("name", "Name must be at least 3 characters long");
        }

        if (description.length < 10) {
            throw new FieldInvalidException(
                "description",
                "Description must be at least 10 characters long"
            );
        }

        if (type.length < 3) {
            throw new FieldInvalidException("type", "Type must be at least 3 characters long");
        }

        if (capacity < 1 || capacity > 5000) {
            throw new FieldInvalidException("capacity", "Capacity must be between 1 and 5000");
        }
    }

    async execute(
        name: string,
        description: string,
        type: string,
        capacity: number,
        disabledAccess: boolean,
        imagesUrl: string[],
        actor: ActorContext
    ): Promise<MovieTheater> {
        this.verifyValidtyMovieTheater(name, description, type, capacity, actor);

        if (imagesUrl.length > 10) {
            throw new TooMuchImagesException();
        }

        const movieTheaterImage: MovieTheaterImage[] = imagesUrl.map(
            (url) => new MovieTheaterImage(null, actor.id, url, new Date())
        );

        const movieTheater = new MovieTheater(
            null,
            name,
            description,
            type,
            capacity,
            disabledAccess,
            movieTheaterImage
        );

        return await this.movieTheaterRepository.create(movieTheater);

        //console.log(movieTheater);
    }
}
