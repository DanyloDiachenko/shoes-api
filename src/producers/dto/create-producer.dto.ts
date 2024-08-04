import { IsNotEmpty, IsString } from "class-validator";

export class CreateProducerDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;
}
