import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProducerDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Title of the producer" })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: "Slug of the producer" })
    slug: string;
}
