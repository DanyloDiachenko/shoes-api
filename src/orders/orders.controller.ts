import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderEntity } from "./entities/order.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: any,
    ): Promise<OrderEntity> {
        const user = req.user;
        return this.ordersService.create(createOrderDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req: any): Promise<OrderEntity[]> {
        const userId = req.user.id;
        return this.ordersService.findByUser(userId);
    }
}
