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
import { AddressEntity } from "src/addresses/entities/address.entity";

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
    ): Promise<OrderEntity> {
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
