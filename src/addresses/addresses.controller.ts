import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";
import { FindOneParamsDto } from "helpers/find-one-params.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import {
    ApiBearerAuth,
    ApiTags,
    ApiOperation,
    ApiResponse,
} from "@nestjs/swagger";
import { AddressResponseDto } from "./dto/address-response.dto";

@ApiTags("addresses")
@Controller("addresses")
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create an address" })
    @ApiResponse({
        status: 201,
        description: "The address has been successfully created.",
        example: AddressResponseDto,
        type: AddressResponseDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized." })
    async create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
        return await this.addressesService.create(
            createAddressDto,
            req.user.id,
        );
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all addresses for the user" })
    @ApiResponse({
        status: 201,
        description: "Return all addresses for the user.",
        type: [AddressResponseDto],
        example: AddressResponseDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized." })
    @ApiResponse({
        status: 404,
        description: "User with ID ... not found.",
    })
    async getAllByUser(@Req() req: any) {
        return await this.addressesService.getAllByUser(req.user.id);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete an address by ID" })
    @ApiResponse({
        status: 200,
        description: "The address has been successfully deleted.",
        example: { success: true },
    })
    @ApiResponse({ status: 404, description: "Address not found." })
    async delete(@Param() params: FindOneParamsDto) {
        return await this.addressesService.delete(params.id);
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update an address by ID" })
    @ApiResponse({
        status: 200,
        description: "The address has been successfully updated.",
        example: AddressResponseDto,
        type: AddressResponseDto,
    })
    @ApiResponse({ status: 404, description: "Address not found." })
    async update(
        @Param() params: FindOneParamsDto,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        return await this.addressesService.update(params.id, updateAddressDto);
    }
}
