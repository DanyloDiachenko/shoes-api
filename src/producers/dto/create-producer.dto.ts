import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProducerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Title of the producer" })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Slug of the producer" })
    slug: string;
}
