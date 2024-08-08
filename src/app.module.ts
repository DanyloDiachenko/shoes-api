import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesModule } from "./categories/categories.module";
import { CategoryEntity } from "./categories/entities/category.entity";
import { ProductsModule } from "./products/products.module";
import { ProducersModule } from "./producers/producers.module";
import { ProductEntity } from "./products/entities/product.entity";
import { ProducerEntity } from "./producers/entities/producer.entity";
import { UsersModule } from "./users/users.module";
import { AddressesModule } from "./addresses/addresses.module";
import { AddressEntity } from "./addresses/entities/address.entity";
import { AuthModule } from "./auth/auth.module";
import { FavoriteEntity } from "./favorites/entities/favorite.entity";
import { UserEntity } from "./users/entites/user.entity";
import { OrdersModule } from "./orders/orders.module";
import { OrderEntity } from "./orders/entities/order.entity";
import { FavoritesModule } from "./favorites/favorites.module";

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
                    ProducerEntity,
                    AddressEntity,
                    FavoriteEntity,
                    UserEntity,
                    OrderEntity,
                ],
            }),
            inject: [ConfigService],
        }),
        CategoriesModule,
        ProductsModule,
        ProducersModule,
        UsersModule,
        AddressesModule,
        AuthModule,
        FavoritesModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
