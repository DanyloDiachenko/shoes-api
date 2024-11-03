import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressEntity } from "./entities/address.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/users/entites/user.entity";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressesRepository: Repository<AddressEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createBillingAddress(
        createAddressDto: CreateAddressDto,
        userId: string,
    ) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["billingAddress"],
        });
        console.log("us", user);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const address = this.addressesRepository.create(createAddressDto);
        await this.addressesRepository.save(address);

        user.billingAddress = address;
        await this.userRepository.save(user);

        return address;
    }

    async createShippingAddress(
        createAddressDto: CreateAddressDto,
        userId: string,
    ) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["shippingAddress"],
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const address = this.addressesRepository.create(createAddressDto);
        await this.addressesRepository.save(address);

        user.shippingAddress = address;
        await this.userRepository.save(user);

        return address;
    }

    async updateBillingAddress(
        updateAddressDto: UpdateAddressDto,
        userId: string,
    ) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["billingAddress"],
        });
        if (!user || !user.billingAddress) {
            throw new NotFoundException(
                `Billing address not found for user with ID ${userId}`,
            );
        }

        const updatedAddress = this.addressesRepository.merge(
            user.billingAddress,
            updateAddressDto,
        );
        await this.addressesRepository.save(updatedAddress);

        return updatedAddress;
    }

    async updateShippingAddress(
        updateAddressDto: UpdateAddressDto,
        userId: string,
    ) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["shippingAddress"],
        });
        if (!user || !user.shippingAddress) {
            throw new NotFoundException(
                `Shipping address not found for user with ID ${userId}`,
            );
        }

        const updatedAddress = this.addressesRepository.merge(
            user.shippingAddress,
            updateAddressDto,
        );
        await this.addressesRepository.save(updatedAddress);

        return updatedAddress;
    }
}
