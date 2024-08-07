import { Controller, Post, Body } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }
}
