import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesModule } from "./categories/categories.module";
import { CategoryEntity } from "./categories/entities/category.entity";
import { ProductsModule } from "./products/products.module";
import { ProducersModule } from "./producers/producers.module";
import { ProductEntity } from "./products/entities/product.entity";
import { ProducerEntity } from "./producers/entities/producer.entity";

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
                entities: [CategoryEntity, ProductEntity, ProducerEntity],
            }),
            inject: [ConfigService],
        }),
        CategoriesModule,
        ProductsModule,
        ProducersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
