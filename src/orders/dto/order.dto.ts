import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProductDto } from "src/products/dto/product.dto";

export class OrderDto {
    @ApiProperty({ description: "ID of the order" })
    id: string;

    @ApiProperty({ description: "User ID of the order" })
    userId: string;

    @ApiProperty({ description: "Amount of the order" })
    amount: number;

    @ApiProperty({ description: "Currency of the order" })
    currency: string;

    @ApiProperty({ description: "Notes of the order", nullable: true })
    @ApiPropertyOptional()
    orderNotes?: string;

    @ApiProperty({
        description: "List of products in the cart",
        type: [ProductDto],
    })
    cart: ProductDto[];

    @ApiProperty({ description: "Shipping type of the order" })
    shippingType: string;

    @ApiProperty({ description: "Timestamp when the order was created" })
    createdAt: Date;
}
