import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}
