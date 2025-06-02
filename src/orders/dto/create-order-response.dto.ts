import { ApiProperty } from "@nestjs/swagger";

class CartOrder {
    @ApiProperty({ description: "ID of product" })
    productId: string;

    @ApiProperty({ description: "Quantity of product" })
    quantity: number;

    @ApiProperty({ description: "Size of product" })
    size: number;
}

export class CreateOrderResponseDto {
    @ApiProperty({ example: CartOrder, description: "Cart of order" })
    cart: CartOrder[];

    @ApiProperty({ description: "Order shipping type" })
    shippingType: string;

    @ApiProperty({ description: "Order notes" })
    orderNotes?: string;

    @ApiProperty({ description: "ID of order" })
    id: string;

    @ApiProperty({ description: "Order created date" })
    createdAt: Date;
}
