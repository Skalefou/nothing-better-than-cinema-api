import {BadRequestException} from "@nestjs/common";

export class TooMuchImagesException extends BadRequestException {
    constructor() {
        super(`You can only upload up to 10 images`);
    }
}