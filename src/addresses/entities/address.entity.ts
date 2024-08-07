import { UserEntity } from "src/users/entites/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class AddressEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    receiver: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    homeNumber: string;

    @Column()
    postIndex: number;

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    user: UserEntity;
}
