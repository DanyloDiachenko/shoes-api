import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/users/entites/user.entity";

@Entity("addresses")
export class AddressEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    homeNumber: string;

    @Column()
    postIndex: string;

    @OneToOne(() => UserEntity, (user) => user.billingAddress)
    @JoinColumn()
    billingUser: UserEntity;

    @OneToOne(() => UserEntity, (user) => user.shippingAddress)
    @JoinColumn()
    shippingUser: UserEntity;
}
