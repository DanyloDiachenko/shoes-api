import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderEntity } from "./entities/order.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
} from "@nestjs/swagger";
import { OrderDto } from "./dto/order.dto";
import { CreateOrderResponseDto } from "./dto/create-order-response.dto";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: "Create a new order" })
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({
        status: 201,
        description: "The order has been successfully created.",
        type: CreateOrderResponseDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: any,
    ): Promise<CreateOrderResponseDto> {
        const userId = req.user.id;

        return this.ordersService.create(createOrderDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: "Get all orders for the authenticated user" })
    @ApiResponse({
        status: 200,
        description: "Return all orders for the user.",
        type: [OrderDto],
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async findAll(@Req() req: any): Promise<OrderEntity[]> {
        const userId = req.user.id;
        return this.ordersService.findByUser(userId);
    }
}
