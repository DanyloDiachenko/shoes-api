import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "src/orders/entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UserEntity } from "src/users/entites/user.entity";
import { AddressEntity } from "src/addresses/entities/address.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private ordersRepository: Repository<OrderEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private addressesRepository: Repository<AddressEntity>,
    ) {}

    async create(createOrderDto: CreateOrderDto, userId: string) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const address = await this.addressesRepository.findOne({
            where: { id: createOrderDto.deliveryAddressId },
        });
        if (!address) {
            throw new NotFoundException(
                `Address with ID ${createOrderDto.deliveryAddressId} not found`,
            );
        }

        const order = this.ordersRepository.create({
            user,
            deliveryAddress: address,
            status: "pending",
            cart: createOrderDto.cart,
        });

        await this.ordersRepository.save(order);
        return order;
    }

    async getUsersOrders(userId: string) {
        return await this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ["deliveryAddress"],
        });
    }
}
