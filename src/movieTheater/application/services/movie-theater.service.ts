import {ActorContext} from "../contexts/actor.context";
import {RoleActor} from "../../../commons/enum/roles.enum";
import {UnauthorizedActorException} from "../../domain/exceptions/unauthorized-actor.exception";
import {FieldInvalidException} from "../../domain/exceptions/fieldInvalid.exception";

export class MovieTheaterService {
    static verifyValidtyMovieTheater(
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
}