import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFavoriteDto {
    @ApiProperty({ description: "ID of the product to add to favorites" })
    @IsString()
    @IsUUID()
    productId: string;
}
