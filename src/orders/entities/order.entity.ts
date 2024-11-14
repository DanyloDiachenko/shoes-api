import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { UserEntity } from "src/users/entites/user.entity";
import { AddressEntity } from "src/addresses/entities/address.entity";

@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;

    @ManyToOne(() => AddressEntity)
    @JoinColumn({ name: "deliveryAddressId" })
    deliveryAddress: AddressEntity;

    @Column("jsonb")
    cart: { productId: string; quantity: number }[];

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("text", { nullable: true })
    orderNotes?: string;
}
