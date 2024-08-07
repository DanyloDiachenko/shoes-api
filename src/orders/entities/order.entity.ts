import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { AddressEntity } from "src/addresses/entities/address.entity";
import { UserEntity } from "src/users/entites/user.entity";
import { OrderCartItemEntity } from "src/orderCartItems/entites/order-cart-item.entity";

@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column({
        type: "enum",
        enum: ["pending", "shipped", "delivered", "cancelled", "succeed"],
        default: "pending",
    })
    status: string;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn()
    user: UserEntity;

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    deliveryAddress: AddressEntity;

    @OneToMany(() => OrderCartItemEntity, (item) => item.order, {
        cascade: true,
    })
    cart: OrderCartItemEntity[];
}
