import { IsString, IsUUID } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    @IsUUID()
    productId: string;
}
