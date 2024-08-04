import { IsOptional, IsString } from "class-validator";

export class UpdateProducerDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    slug: string;
}
