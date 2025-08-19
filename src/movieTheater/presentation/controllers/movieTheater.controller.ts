import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { Roles } from "../../../auth/presentation/decorators/roles.decorator";
import { Role } from "../../../users/domain/entities/roles.enum";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { AttachUser } from "../../../auth/presentation/decorators/attach-user.decorator";
import { Users } from "../../../users/domain/entities/users.entity";
import { AttachUserGuard } from "../../../auth/presentation/guards/attach-user.guard";
import { CreateMovieTheaterDTO } from "../dtos/createMovieTheater.dto";
import { CreateMovieTheaterUseCase } from "../../application/use-cases/create-movie-theater.use-case";
import { MovieTheater } from "src/movieTheater/domain/entities/movieTheater.entity";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("movie-theater")
export class MovieTheaterController {
    constructor(private readonly createMovieTheaterUsecase: CreateMovieTheaterUseCase) {}

    @Post()
    @UseGuards(JwtAuthGuard, AttachUserGuard, RolesGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FilesInterceptor("images", 10))
    async createMovieTheater(
        @AttachUser() user: Users,
        @Body() createMovieTheaterInput: CreateMovieTheaterDTO,
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<void> {
        console.log("kkakaka");
        if (!user.id) {
            throw new UnauthorizedException("No user found");
        }

        return await this.createMovieTheaterUsecase.execute(
            createMovieTheaterInput.name,
            createMovieTheaterInput.description,
            createMovieTheaterInput.type,
            createMovieTheaterInput.capacity,
            createMovieTheaterInput.disabledAccess,
            [],
            user.id
        );
    }
}
