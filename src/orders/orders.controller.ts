import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
        const userId = req.user.id;

        return await this.ordersService.create(createOrderDto, userId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUsersOrders(@Req() req: any) {
        const userId = req.user.id;
        console.log(userId);

        return await this.ordersService.getUsersOrders(userId);
    }
}
