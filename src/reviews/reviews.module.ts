import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewEntity } from "./entity/review.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewsService } from "./reviews.service";
import { UserEntity } from "src/users/entites/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReviewEntity, ProductEntity, UserEntity]),
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})
export class ReviewsModule {}
