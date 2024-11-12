import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Communication {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4()

    @Column()
    title: string

    @Column()
    message: string

    @Column()
    gymId: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
