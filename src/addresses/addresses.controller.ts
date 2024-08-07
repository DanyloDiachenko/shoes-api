import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("addresses")
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @Post()
    async create(createAddressDto: CreateAddressDto) {
        return await this.addressesService.create(createAddressDto);
    }

    @Get(":id")
    async getAllByUserId(@Param() params: FindOneParamsDto) {
        return await this.addressesService.getAllByUserId(params.id);
    }

    @Delete(":id")
    async delete(@Param() params: FindOneParamsDto) {
        return await this.addressesService.delete(params.id);
    }

    @Put(":id")
    async update(
        @Param() params: FindOneParamsDto,
        @Body() updateAddressDto: UpdateAddressDto,
    ) {
        return await this.addressesService.update(params.id, updateAddressDto);
    }
}
