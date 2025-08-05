export class Movie {
    constructor(
        public readonly id: string | null,
        public readonly title: string,
        public readonly director: string,
        public readonly releaseDate: Date,
        public readonly genre: string,
        public readonly cast: string[],
    ) {}
}
