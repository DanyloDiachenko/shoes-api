import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AddressDto } from "src/addresses/dto/address.dto";
import { ProductDto } from "src/products/dto/product.dto";

export class OrderDto {
    @ApiProperty({ description: "ID of the order" })
    id: string;

    @ApiProperty({
        description: "Delivery address of the order",
        type: AddressDto,
    })
    deliveryAddress: AddressDto;

    @ApiProperty({
        description: "List of products in the cart",
        type: [ProductDto],
    })
    cart: ProductDto[];

    @ApiProperty({ description: "Timestamp when the order was created" })
    createdAt: Date;

    @ApiProperty({ description: "Notes of the order", nullable: true })
    @ApiPropertyOptional()
    orderNotes?: string;
}
