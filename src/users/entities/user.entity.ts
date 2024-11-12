import { Gym } from "src/gyms/entities/gym.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({default: 0})
    admisions: number;

    @Column({default: 0})
    points: number;

    @Column({type: 'simple-array', nullable: true})
    trainingDates: string[];

    @Column({default: 'active' })
    status: string;

    @ManyToOne(() => Gym, (gym) => gym.users, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn({name: "gymId"})
    gym: Gym
    
    @Column()
    gymId: string;
}
