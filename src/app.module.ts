import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesModule } from "./categories/categories.module";
import { CategoryEntity } from "./categories/entities/category.entity";
import { ProductsModule } from "./products/products.module";
import { BrandsModule } from "./brands/brands.module";
import { ProductEntity } from "./products/entities/product.entity";
import { BrandEntity } from "./brands/entities/brand.entity";
import { UsersModule } from "./users/users.module";
import { AddressesModule } from "./addresses/addresses.module";
import { AddressEntity } from "./addresses/entities/address.entity";
import { AuthModule } from "./auth/auth.module";
import { FavoriteEntity } from "./favorites/entities/favorite.entity";
import { UserEntity } from "./users/entites/user.entity";
import { FavoritesModule } from "./favorites/favorites.module";
import { OrderEntity } from "./orders/entities/order.entity";
import { OrdersModule } from "./orders/orders.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { ReviewEntity } from "./reviews/entity/review.entity";
import { ColorEntity } from "./colors/entity/color.entity";
import { ColorsModule } from "./colors/colors.module";
import { SizeEntity } from "./sizes/entity/size.entity";
import { SizesModule } from "./sizes/sizes.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                synchronize: true,
                autoLoadEntities: true,
                entities: [
                    CategoryEntity,
                    ProductEntity,
                    ProductEntity,
                    AddressEntity,
                    FavoriteEntity,
                    UserEntity,
                    OrderEntity,
                    ReviewEntity,
                    ColorEntity,
                    BrandEntity,
                    SizeEntity,
                ],
            }),
            inject: [ConfigService],
        }),
        CategoriesModule,
        ProductsModule,
        BrandsModule,
        UsersModule,
        AddressesModule,
        AuthModule,
        FavoritesModule,
        OrdersModule,
        ReviewsModule,
        ColorsModule,
        SizesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
