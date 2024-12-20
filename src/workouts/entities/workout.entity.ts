import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  type: 'gimnasio_tradicional' | 'crossfit' | 'funcional' | 'bodyweight';

  @Column()
  level: 'Principiante' | 'Novato' | 'Intermedio' | 'Avanzado' | 'Maestro' | 'Experto';

  @Column({ type: 'jsonb' })
  dailyPlans: {
    day: number;
    dailyPlan: {
      name: string;
      video: string;
      variations?: string;
      sets?: number;
      reps?: number;
      duration?: string;
      rest?: string;
      weight?: string;
    }[];
  }[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.workouts, { onDelete: "CASCADE" })
  user: User;
}

