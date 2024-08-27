import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SizesService } from "./sizes.service";
import { SizesController } from "./sizes.controller";
import { SizeEntity } from "./entity/size.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SizeEntity])],
    controllers: [SizesController],
    providers: [SizesService],
})
export class SizesModule {}
