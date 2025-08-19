import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieTheaterDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "5th big cinema" })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "A great place for all your family !" })
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "IMAX" })
    type: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @ApiProperty({ example: "Science Fiction" })
    capacity: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: true,
    })
    disabledAccess: boolean;
}
