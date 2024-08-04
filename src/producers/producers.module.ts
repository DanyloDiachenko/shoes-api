import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProducerEntity } from "./entities/producer.entity";
import { ProducersController } from "./producers.controller";
import { ProducersService } from "./producers.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProducerEntity])],
    controllers: [ProducersController],
    providers: [ProducersService],
})
export class ProducersModule {}
