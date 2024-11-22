import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  type: 'gimnasio_tradicional' | 'crossfit' | 'funcional' | 'bodyweight';

  @Column("text", { array: true })
  targetGroups: ('tren_superior' | 'tren_inferior' | 'gluteos' | 'cuerpo_completo')[];

  @Column()
  level: 'Principiante' | 'Novato' | 'Intermedio' | 'Avanzado' | 'Maestro' | 'Experto';

  @Column()
  sublevel: number; // Subnivel dentro del nivel (1-4, dependiendo del nivel)

  @Column({ type: 'jsonb' })
  warmUp: {
    description: string; // Descripción del calentamiento
    duration: string; // Duración estimada (ej: "5 minutos")
  };

  @Column({ type: 'jsonb' })
  exercises: {
    name: string; // Nombre del ejercicio
    variations?: string[]; // Variaciones (opcional)
    sets?: number; // Número de series (opcional)
    reps?: number; // Repeticiones por serie (opcional)
    duration?: string; // Duración para ejercicios funcionales (opcional)
    rest?: string; // Descanso entre series o ejercicios
    weight?: string; // Peso sugerido (ej: "50% RM", "ligero")
  }[];

  @Column({ type: 'jsonb', nullable: true })
  aerobic?: {
    description: string; // Descripción del ejercicio aeróbico
    duration: string; // Duración estimada (ej: "10 minutos")
  };

  @Column({ type: 'jsonb' })
  coolDown: {
    description: string; // Descripción del enfriamiento
    duration: string; // Duración estimada (ej: "5 minutos")
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
