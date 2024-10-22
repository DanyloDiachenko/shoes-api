import { Injectable } from "@nestjs/common";
import { AddressEntity } from "src/addresses/entities/address.entity";
import { FavoriteEntity } from "src/favorites/entities/favorite.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { ReviewEntity } from "src/reviews/entity/review.entity";
import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    displayName?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    passwordHash?: string;

    @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
    favorites: FavoriteEntity[];

    @OneToOne(() => AddressEntity, (address) => address.billingUser, {
        cascade: true,
    })
    billingAddress: AddressEntity;

    @OneToOne(() => AddressEntity, (address) => address.shippingUser, {
        cascade: true,
    })
    shippingAddress: AddressEntity;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.user)
    reviews: ReviewEntity[];
}
