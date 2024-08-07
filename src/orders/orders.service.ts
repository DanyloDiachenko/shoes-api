import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "src/orders/entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderCartItemEntity } from "src/orderCartItems/entites/order-cart-item.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderCartItemEntity)
        private orderItemRepository: Repository<OrderCartItemEntity>,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        const { cart, address } = createOrderDto;

        const order = new OrderEntity();

        order.deliveryAddress = address;
        order.cart = [];
        order.status = "pending";

        await this.orderRepository.save(order);

        for (const item of cart) {
            const orderItem = new OrderCartItemEntity();

            orderItem.mainImage = item.mainImage;
            orderItem.color = item.color;
            orderItem.size = item.size;
            orderItem.price = item.price;
            orderItem.discountPercentage = item.discountPercentage;
            orderItem.quantity = item.quantity;
            orderItem.order = order;

            await this.orderItemRepository.save(orderItem);
        }

        return order;
    }
}
