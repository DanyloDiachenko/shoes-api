import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UserEntity } from "src/users/entites/user.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { CreateOrderResponseDto } from "./dto/create-order-response.dto";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: Repository<OrderEntity>,
        @InjectRepository(ProductEntity)
        private productsRepository: Repository<ProductEntity>,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    async create(
        createOrderDto: CreateOrderDto,
        userId: string,
    ): Promise<CreateOrderResponseDto> {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const order = this.ordersRepository.create({
            ...createOrderDto,
            user,
        });

        await this.ordersRepository.save(order);

        const { user: userData, ...orderData } = order;

        return { ...orderData };
    }

    /* 
    {
    "cart": [
        {
            "productId": "f0f8a863-bbc3-4307-b393-a6aa569a2cb8",
            "quantity": 4,
            "size": 43
        }
    ],
    "shippingType": "standart",
    "orderNotes": "",
    "user": {
        "id": "ef1d6402-459f-4164-b996-90f4eae63e4c",
        "email": "danildiachenko23@gmail.com",
        "firstName": "Danil",
        "lastName": "Diachenko",
        "displayName": "danil_diachenko",
        "phone": "380954517597",
        "passwordHash": "$argon2id$v=19$m=65536,t=3,p=4$i7wCSEjz0YSE7A1NeHr3yw$H7mp7EV5VV3HDBZz8adgT91GaXBYwJFGWZfCfevke18",
        "authProvider": null
    },
    "id": "0a181f65-b2e6-4f00-a565-e0fbd4165331",
    "createdAt": "2025-04-29T19:42:16.858Z"
}
    */

    async findByUser(userId: string): Promise<OrderEntity[]> {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const orders = await this.ordersRepository.find({
            where: { user: user },
        });
        console.log(orders);

        for (const order of orders) {
            const updatedCart = await Promise.all(
                order.cart.map(async (item) => {
                    console.log(item);
                    const product = await this.productsRepository.findOne({
                        where: { id: item.productId },
                        relations: ["mainCategory", "brand"],
                    });

                    if (!product) {
                        throw new NotFoundException(
                            `Product with ID ${item.productId} not found`,
                        );
                    }

                    if (product.quantityInStock < item.quantity) {
                        throw new BadRequestException(
                            `Product with ID ${item.productId} is out of stock`,
                        );
                    }

                    if (product) {
                        return {
                            ...product,
                            quantity: item.quantity,
                            size: item.size,
                        };
                    }
                    return item;
                }),
            );
            order.cart = updatedCart as any;
        }

        return orders;
    }
}
