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
import { RoleActor } from "../../../commons/enum/roles.enum";
import { JwtAuthGuard } from "../../../auth/presentation/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/presentation/guards/roles.guard";
import { AttachUser } from "../../../auth/presentation/decorators/attach-user.decorator";
import { Users } from "../../../users/domain/entities/users.entity";
import { AttachUserGuard } from "../../../auth/presentation/guards/attach-user.guard";
import { CreateMovieTheaterDTO } from "../dtos/createMovieTheater.dto";
import { CreateMovieTheaterUseCase } from "../../application/use-cases/create-movie-theater.use-case";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { join, extname } from "path";
import { ActorContext } from "../../application/contexts/actor.context";
import { MovieTheater } from "../../domain/entities/movieTheater.entity";

const uploadDir = join(process.cwd(), "uploads");
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

@Controller("movie-theater")
export class MovieTheaterController {
    constructor(private readonly createMovieTheaterUsecase: CreateMovieTheaterUseCase) {}

    @Post()
    @UseGuards(JwtAuthGuard, AttachUserGuard, RolesGuard)
    @Roles(RoleActor.Admin)
    @UseInterceptors(
        FilesInterceptor("images", 10, {
            storage: diskStorage({
                destination: (_req, _file, cb) => cb(null, uploadDir),
                filename: (_req, file, cb) => {
                    const ext = extname(file.originalname) || "";
                    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
                },
            }),
            fileFilter: (_req, file, cb) => {
                const ok = ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                    file.mimetype
                );
                cb(ok ? null : new Error("Only images (jpeg/jpg/png/webp) are allowed"), ok);
            },
            limits: { fileSize: 5 * 1024 * 1024, files: 10 },
        })
    )
    async createMovieTheater(
        @AttachUser() user: Users,
        @Body() createMovieTheaterInput: CreateMovieTheaterDTO,
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<MovieTheater> {
        if (!user.id) {
            throw new UnauthorizedException("No user found");
        }

        const imageUrls = files.map(
            (file) => `${process.env.BASE_FILES_URL}/uploads/${file.filename}`
        );

        const actor: ActorContext = {
            id: user.id,
            roles: user.role,
        };

        return await this.createMovieTheaterUsecase.execute(
            createMovieTheaterInput.name,
            createMovieTheaterInput.description,
            createMovieTheaterInput.type,
            createMovieTheaterInput.capacity,
            createMovieTheaterInput.disabledAccess,
            imageUrls,
            actor
        );
    }
}
