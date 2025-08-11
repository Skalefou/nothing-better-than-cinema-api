import { MovieTheaterImage } from "./movieTheater-image.entity";

export class MovieTheater {
    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly description: string,
        public readonly type: string,
        public readonly capacity: number,
        public readonly disabledAccess: boolean,
        public readonly images?: MovieTheaterImage[]
    ) {}
}
