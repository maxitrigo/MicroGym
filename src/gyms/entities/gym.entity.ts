import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
        nullable: false,
    })
    address: string;

    @Column({
        nullable: false,
    })
    phone: string;

    @Column({
        nullable: false,
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

}
