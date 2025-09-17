import { IsBoolean, IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUpdateMovieTheaterDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: "5th big cinema" })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @ApiProperty({ example: "A great place for all your family !" })
    description: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: "IMAX" })
    type: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5000)
    @ApiProperty({ example: "Science Fiction" })
    capacity: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: true,
    })
    disabledAccess: boolean;
}
