import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Gym {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    owner: string;

    @Column()
    slug: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    openHours: string;

    @Column()
    closeHours: string;

}
