export class MovieTheaterImage {
    constructor(
        public readonly id: string | null,
        public readonly author: string,
        public readonly url: string,
        public readonly publicationDate: Date,
        public readonly movieTheaterId: string | null = null
    ) {}
}
