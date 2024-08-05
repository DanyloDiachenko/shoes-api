import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    /* @Column()
    favorites: relation to favourites */

    /* @Column()
    orders: relation to orders */

    /* @Column()
    history: relation to history */

    /* @Column
    address: relation to address */
}
