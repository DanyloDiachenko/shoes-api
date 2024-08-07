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

    async create(createAddressDto: CreateAddressDto) {
        const createdAddress =
            await this.addressesRepository.create(createAddressDto);

        return await this.addressesRepository.save(createdAddress);
    }

    async getAllByUserId(userId: string) {
        const isExistingUser = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!isExistingUser) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return await this.addressesRepository.find({
            where: { user: { id: userId } },
        });
    }

    async delete(id: string) {
        const addressToDelete = await this.addressesRepository.findOne({
            where: { id },
        });

        if (!addressToDelete) {
            throw new NotFoundException(`Address with ID ${id} not found`);
        }

        return await this.addressesRepository.delete({ id: id });
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        const isExistingAddress = await this.addressesRepository.findOne({
            where: { id },
        });

        if (!isExistingAddress) {
            throw new NotFoundException(`Address with ID ${id} not found`);
        }

        const updatedAddress = await this.addressesRepository.merge(
            isExistingAddress,
            updateAddressDto,
        );

        return this.addressesRepository.save(updatedAddress);
    }
}
