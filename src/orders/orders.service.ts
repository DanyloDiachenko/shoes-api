import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UserEntity } from "src/users/entites/user.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { AddressEntity } from "src/addresses/entities/address.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: Repository<OrderEntity>,
        @InjectRepository(ProductEntity)
        private productsRepository: Repository<ProductEntity>,
    ) {}

    async create(
        createOrderDto: CreateOrderDto,
        user: UserEntity,
    ): Promise<OrderEntity> {
        const order = this.ordersRepository.create({
            ...createOrderDto,
            user,
            deliveryAddress: {
                id: createOrderDto.deliveryAddressId,
            } as AddressEntity,
        });

        return this.ordersRepository.save(order);
    }

    async findByUser(userId: string): Promise<OrderEntity[]> {
        const orders = await this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ["deliveryAddress"],
        });

        for (const order of orders) {
            const updatedCart = await Promise.all(
                order.cart.map(async (item) => {
                    const product = await this.productsRepository.findOne({
                        where: { id: item.productId },
                        relations: ["category", "brand"],
                    });
                    if (product) {
                        return {
                            ...product,
                            quantity: item.quantity,
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
