import { ApiProperty } from "@nestjs/swagger";

export class FavoriteDto {
    @ApiProperty({ description: "ID of the favorite" })
    id: string;

    @ApiProperty({ description: "Title of the favorite" })
    title: string;

    @ApiProperty({ description: "Image source of the favorite" })
    mainImage: string;
}
