import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  variations?: string;

  @IsOptional()
  @IsNumber()
  sets?: number;

  @IsOptional()
  @IsNumber()
  reps?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  rest?: string;

  @IsOptional()
  @IsString()
  weight?: string;
}

class DailyPlanDto {
  @IsNumber()
  @IsNotEmpty()
  day: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  dailyPlan: ExerciseDto[];
}

export class CreateWorkoutDto {
  @IsEnum(['gimnasio_tradicional', 'crossfit', 'funcional', 'bodyweight'])
  type: 'gimnasio_tradicional' | 'crossfit' | 'funcional' | 'bodyweight';

  @IsEnum(['Principiante', 'Novato', 'Intermedio', 'Avanzado', 'Maestro', 'Experto'])
  level: 'Principiante' | 'Novato' | 'Intermedio' | 'Avanzado' | 'Maestro' | 'Experto';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailyPlanDto)
  dailyPlans: DailyPlanDto[];

  @IsNotEmpty()
  @IsString()
  userId: string;  // Agregado el usuario
}
