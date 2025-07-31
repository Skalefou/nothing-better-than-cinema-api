import {IsDateString, IsNotEmpty, IsOptional, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "2001 a space odyssey" })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Stanley Kubrick" })
  director: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: "1968-04-02" })
  releaseDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Science Fiction" })
  genre: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    example: ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
  })
  cast: string[];
}
