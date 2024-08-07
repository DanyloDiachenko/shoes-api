import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressEntity } from "./entities/address.entity";
import { UserEntity } from "src/users/entites/user.entity";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";

@Module({
    imports: [TypeOrmModule.forFeature([AddressEntity, UserEntity])],
    controllers: [AddressesController],
    providers: [AddressesService],
})
export class AddressesModule {}
