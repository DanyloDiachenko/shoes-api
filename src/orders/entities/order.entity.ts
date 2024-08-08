import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { UserEntity } from "src/users/entites/user.entity";
import { AddressEntity } from "src/addresses/entities/address.entity";

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

    @ManyToOne(() => AddressEntity)
    @JoinColumn()
    deliveryAddress: AddressEntity;

    @Column("jsonb")
    cart: any[];
}
