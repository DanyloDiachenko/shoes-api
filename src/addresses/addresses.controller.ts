import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
} from "@nestjs/swagger";
import { AddressDto } from "./dto/address.dto";

@ApiTags("addresses")
@Controller("addresses")
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @Post("billing")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create billing address" })
    @ApiResponse({
        status: 201,
        description: "The billing address has been successfully created.",
        type: AddressDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async createBillingAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Req() req: any,
    ) {
        return await this.addressesService.createBillingAddress(
            createAddressDto,
            req.user.id,
        );
    }

    @Post("shipping")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create shipping address" })
    @ApiResponse({
        status: 201,
        description: "The shipping address has been successfully created.",
        type: AddressDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async createShippingAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Req() req: any,
    ) {
        return await this.addressesService.createShippingAddress(
            createAddressDto,
            req.user.id,
        );
    }

    @Put("billing")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update billing address" })
    @ApiResponse({
        status: 200,
        description: "The billing address has been successfully updated.",
        type: AddressDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({
        status: 404,
        description: "Billing address not found for user.",
    })
    async updateBillingAddress(
        @Body() updateAddressDto: UpdateAddressDto,
        @Req() req: any,
    ) {
        return await this.addressesService.updateBillingAddress(
            updateAddressDto,
            req.user.id,
        );
    }

    @Put("shipping")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update shipping address" })
    @ApiResponse({
        status: 200,
        description: "The shipping address has been successfully updated.",
        type: AddressDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({
        status: 404,
        description: "Shipping address not found for user.",
    })
    async updateShippingAddress(
        @Body() updateAddressDto: UpdateAddressDto,
        @Req() req: any,
    ) {
        return await this.addressesService.updateShippingAddress(
            updateAddressDto,
            req.user.id,
        );
    }
}
