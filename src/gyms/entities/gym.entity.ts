import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Gym {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: true,
    })
    address: string;

    @Column({
        nullable: true,
    })
    phone: string;

    @Column({
        nullable: true,
    })
    email: string;

    @Column({
        nullable: false,
    })
    owner: string;

    @Column({
        unique:true,
        nullable: false,
    })
    slug: string;

    @Column({
        nullable: true
    })
    image: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        nullable: true
    })
    openHours: string;

    @Column({
        nullable: true
    })
    closeHours: string;

    @Column({
        nullable: true,
        default: null
    })
    subscriptionEnd: Date;

    @Column({
        nullable: true
    })
    mercadoPago: string;

    @OneToMany( () => User, (user) => user.gym )
    users: User[]

}
