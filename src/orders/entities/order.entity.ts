import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "src/users/entites/user.entity";

@Entity("orders")
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;

    @Column("jsonb")
    cart: { productId: string; quantity: number; size: number }[];

    @Column("text")
    shippingType: string;

    @Column("text", { nullable: true })
    orderNotes?: string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
