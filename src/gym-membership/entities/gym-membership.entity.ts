import { Column } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class GymMembership {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    duration: number;

    @Column()
    role: string;

    @Column()
    gymId: string;
}
