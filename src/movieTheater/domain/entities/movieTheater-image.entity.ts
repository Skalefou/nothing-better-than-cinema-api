export class MovieTheaterImage {
    constructor(
        public readonly id: string | null,
        public readonly authorId: string,
        public readonly url: string,
        public readonly publicationDate: Date
    ) {}
}
