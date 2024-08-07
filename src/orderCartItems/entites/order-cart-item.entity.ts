import { OrderEntity } from "src/orders/entities/order.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("order_items")
export class OrderCartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mainImage: string;

    @Column()
    color: string;

    @Column()
    size: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    discountPercentage?: number;

    @Column()
    quantity: number;

    @ManyToOne(() => OrderEntity, (order) => order.cart)
    order: OrderEntity;
}
