import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "src/orders/entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderCartItemEntity } from "src/orderCartItems/entites/order-cart-item.entity";
import { UserEntity } from "src/users/entites/user.entity";
import { AddressEntity } from "src/addresses/entities/address.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: Repository<OrderEntity>,
        @InjectRepository(OrderCartItemEntity)
        private ordersItemRepository: Repository<OrderCartItemEntity>,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressesRepository: Repository<AddressEntity>,
    ) {}

    async create(createOrderDto: CreateOrderDto, userId: string) {
        const { cart, deliveryAddressId } = createOrderDto;

        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const deliveryAddress = await this.addressesRepository.findOne({
            where: { id: deliveryAddressId },
        });
        if (!deliveryAddress) {
            throw new NotFoundException(
                `Address with ID ${deliveryAddress} not found`,
            );
        }

        const order = new OrderEntity();

        order.user = user;
        order.deliveryAddress = deliveryAddress;
        order.status = "pending";

        await this.ordersRepository.save(order);

        for (const item of cart) {
            const orderItem = new OrderCartItemEntity();

            orderItem.mainImage = item.mainImage;
            orderItem.color = item.color;
            orderItem.size = item.size;
            orderItem.price = item.price;
            orderItem.discountPercentage = item.discountPercentage;
            orderItem.quantity = item.quantity;
            orderItem.order = order;

            await this.ordersItemRepository.save(orderItem);
        }

        return order;
    }

    async getUsersOrders(userId: string) {
        return await this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ["deliveryAddress", "cart"],
        });
    }
}
