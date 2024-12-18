import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import gymExercises from './gymExercises';
import functionalExercises from './functionalExercises';
import crossfitExercises from './crossfitExercises';
import bodyweightExercises from './bodyweightExercises';
import warmUpExercises from './warmupExercises';
import { WorkoutsRepository } from './workouts.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly workoutsRepository: WorkoutsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createGymWorkout(userData) {
    const { frequency, goal, level } = userData;
  
    // Mapeo de niveles
    const isBeginner = ['principiante', 'novato', 'intermedio'].includes(level.toLowerCase());
    const isAdvanced = ['avanzado', 'maestro', 'experto'].includes(level.toLowerCase());
  
    const goalsConfig = {
      "definicion muscular": {
        beginner: { sets: [3, 4], reps: [10, 15], rest: 60 },
        advanced: { sets: [3, 4], reps: [10, 15], rest: 60 },
      },
      "hipertrofia": {
        beginner: { sets: [3, 4], reps: [8, 12], rest: 60 },
        advanced: { sets: [3, 6], reps: [1, 12], rest: 45 },
      },
      "resistencia muscular": {
        beginner: { sets: [2, 4], reps: [10, 25], rest: 60 },
        advanced: { sets: [3, 4], reps: [10, 25], rest: 60 },
      },
      "entrenamiento de fuerza": {
        beginner: { sets: [2, 3], reps: [8, 12], rest: 60 },
        advanced: { sets: [3, 4], reps: [1, 8], rest: 90 },
      },
    };
  
    const goalConfig = isBeginner ? goalsConfig[goal].beginner : goalsConfig[goal].advanced;
  
    const fullBody = ['isquiotibiales', 'triceps', 'pantorrillas', 'cuadriceps', 'espalda', 'biceps', 'gluteos', 'hombros', 'pecho'];
    const upperBody = ['espalda', 'biceps', 'hombros', 'pecho', 'triceps'];
    const lowerBody = ['isquiotibiales', 'pantorrillas', 'cuadriceps', 'gluteos'];
    const upperFront = ['pecho', 'triceps', 'hombros'];
    const upperBack = ['espalda', 'biceps', 'hombros'];
    const lowerFront = ['isquiotibiales', 'pantorrillas', 'cuadriceps'];
    const lowerBack = ['gluteos', 'pantorrillas', 'cuadriceps'];
  
    let workoutSplit = [];
  
    switch (frequency) {
      case 1:
        workoutSplit = [{ day: 1, groups: fullBody }];
        break;
      case 2:
        workoutSplit = [
          { day: 1, groups: upperBody },
          { day: 2, groups: lowerBody },
        ];
        break;
      case 3:
        workoutSplit = [
          { day: 1, groups: upperFront },
          { day: 2, groups: upperBack },
          { day: 3, groups: lowerBody },
        ];
        break;
      case 4:
        workoutSplit = [
          { day: 1, groups: upperFront },
          { day: 2, groups: upperBack },
          { day: 3, groups: lowerFront },
          { day: 4, groups: lowerBack },
        ];
        break;
      case 5:
        workoutSplit = [
          { day: 1, groups: upperFront },
          { day: 2, groups: upperBack },
          { day: 3, groups: lowerFront },
          { day: 4, groups: lowerBack },
          { day: 5, groups: fullBody },
        ];
        break;
      case 6:
        workoutSplit = [
          { day: 1, groups: upperFront },
          { day: 2, groups: upperBack },
          { day: 3, groups: fullBody },
          { day: 4, groups: lowerFront },
          { day: 5, groups: lowerBack },
          { day: 6, groups: fullBody },
        ];
        break;
      default:
        throw new Error('Invalid frequency');
    }

    const plan = workoutSplit.map(({ day, groups }) => {
      const exercisesPerGroup = Math.floor(10 / groups.length);
      const extraExercises = 10 % groups.length;
  
      const dailyPlan = groups.flatMap((group, index) => {
        const groupExercises = gymExercises[group];
        if (!groupExercises || groupExercises.length === 0) {
          throw new Error(`No exercises found for muscle group: ${group}`);
        }
  
        const groupExerciseCount = exercisesPerGroup + (index < extraExercises ? 1 : 0);
  
        const selectedExercises = groupExercises
          .sort(() => 0.5 - Math.random())
          .slice(0, groupExerciseCount)
          .map(exercise => ({
            name: exercise.name,
            video: exercise.video,
            variations: exercise.variations[Math.floor(Math.random() * exercise.variations.length)],
            sets: goalConfig.sets[Math.floor(Math.random() * goalConfig.sets.length)],
            reps: goalConfig.reps[Math.floor(Math.random() * goalConfig.reps.length)],
            rest: goalConfig.rest,
          }));
  
        return selectedExercises;
      });
  
      return { day, dailyPlan };
    });
  
    return plan;
  }


  async createFunctionalWorkout(userData) {
    const { frequency, level } = userData;

    // Validar nivel
    const levels = ['principiante', 'novato', 'intermedio', 'avanzado', 'maestro', 'experto'];
    if (!levels.includes(level.toLowerCase())) {
        throw new Error('Invalid level. Must be one of: principiante, novato, intermedio, avanzado, maestro, experto.');
    }

    // Validar frecuencia
    if (!frequency || frequency < 1 || frequency > 6) {
        throw new Error('Invalid frequency. Must be between 1 and 6.');
    }

    // Configurar niveles
    const levelConfig = {
        beginner: { sets: [2, 3], reps: [8, 12], rest: 90 },
        intermediate: { sets: [3, 4], reps: [10, 15], rest: 75 },
        advanced: { sets: [4, 5], reps: [12, 18], rest: 60 },
    };

    const isBeginner = ['principiante', 'novato'].includes(level.toLowerCase());
    const isIntermediate = ['intermedio', 'avanzado'].includes(level.toLowerCase());
    const isAdvanced = ['maestro', 'experto'].includes(level.toLowerCase());

    const selectedConfig = isBeginner
        ? levelConfig.beginner
        : isIntermediate
        ? levelConfig.intermediate
        : levelConfig.advanced;

    // Configuración de ejercicios y planificación
    const functionalExercisesList = functionalExercises.funcional;

    const warmUp = await this.createWarmUpPlan();

    const workoutSplit = Array.from({ length: frequency }, (_, index) => {
        const exercisesPerDay = 8; // Ahora son 8 ejercicios por día

        // Mezclar los ejercicios disponibles
        const shuffledExercises = [...functionalExercisesList].sort(() => Math.random() - 0.5);

        // Seleccionar ejercicios para este día
        const selectedExercises = shuffledExercises.slice(0, exercisesPerDay);

        return {
            day: index + 1,
            warmUp: warmUp,
            exercises: selectedExercises.map(exercise => ({
                name: exercise.name,
                variation: exercise.variations.length > 0
                    ? exercise.variations[Math.floor(Math.random() * exercise.variations.length)]
                    : null,
                sets: selectedConfig.sets[Math.floor(Math.random() * selectedConfig.sets.length)],
                reps: selectedConfig.reps[Math.floor(Math.random() * selectedConfig.reps.length)],
                rest: selectedConfig.rest,
            })),
        };
    });

    return workoutSplit;
}


  async createCrossfitWorkout(userData) {
    const { frequency, level } = userData;

    // Validar nivel
    const levels = ['principiante', 'novato', 'intermedio', 'avanzado', 'maestro', 'experto'];
    if (!levels.includes(level.toLowerCase())) {
        throw new Error('Invalid level. Must be one of: principiante, novato, intermedio, avanzado, maestro, experto.');
    }

    // Validar frecuencia
    if (!frequency || frequency < 1 || frequency > 6) {
        throw new Error('Invalid frequency. Must be between 1 and 6.');
    }

    // Configurar niveles
    const levelConfig = {
        beginner: { sets: [2, 3], reps: [8, 12], rest: 90 },
        intermediate: { sets: [3, 4], reps: [10, 15], rest: 75 },
        advanced: { sets: [4, 5], reps: [12, 18], rest: 60 },
    };

    const isBeginner = ['principiante', 'novato'].includes(level.toLowerCase());
    const isIntermediate = ['intermedio', 'avanzado'].includes(level.toLowerCase());
    const isAdvanced = ['maestro', 'experto'].includes(level.toLowerCase());

    const selectedConfig = isBeginner
        ? levelConfig.beginner
        : isIntermediate
        ? levelConfig.intermediate
        : levelConfig.advanced;

    // Filtrar ejercicios según el nivel
    const allowedExercises = crossfitExercises.crossfit.filter(exercise => {
        const minLevelIndex = levels.indexOf(exercise.minLevel);
        const userLevelIndex = levels.indexOf(level.toLowerCase());
        return userLevelIndex >= minLevelIndex;
    });

    const warmUp = await this.createWarmUpPlan();

    // Configuración de entrenamiento
    const workoutSplit = Array.from({ length: frequency }, (_, index) => {
        const exercisesPerDay = 8; // 8 ejercicios por día

        // Mezclar los ejercicios disponibles
        const shuffledExercises = [...allowedExercises].sort(() => Math.random() - 0.5);

        // Seleccionar ejercicios para este día
        const selectedExercises = shuffledExercises.slice(0, exercisesPerDay);

        return {
            day: index + 1,
            warmUp: warmUp,
            exercises: selectedExercises.map(exercise => ({
                name: exercise.name,
                variation: exercise.variations.length > 0
                    ? exercise.variations[Math.floor(Math.random() * exercise.variations.length)]
                    : null,
                sets: selectedConfig.sets[Math.floor(Math.random() * selectedConfig.sets.length)],
                reps: selectedConfig.reps[Math.floor(Math.random() * selectedConfig.reps.length)],
                rest: selectedConfig.rest,
            })),
        };
    });

    return workoutSplit;
  }



  async createBodyweightWorkout(userData) {
    const { frequency, level } = userData;

    // Validar nivel
    const levels = ['principiante', 'novato', 'intermedio', 'avanzado', 'maestro', 'experto'];
    if (!levels.includes(level.toLowerCase())) {
        throw new Error('Invalid level. Must be one of: principiante, novato, intermedio, avanzado, maestro, experto.');
    }

    // Validar frecuencia
    if (!frequency || frequency < 1 || frequency > 6) {
        throw new Error('Invalid frequency. Must be between 1 and 6.');
    }

    // Configurar niveles
    const levelConfig = {
        beginner: { sets: [2, 3], reps: [10, 15], rest: 90 },
        intermediate: { sets: [3, 4], reps: [12, 18], rest: 75 },
        advanced: { sets: [4, 5], reps: [15, 20], rest: 60 },
    };

    const isBeginner = ['principiante', 'novato'].includes(level.toLowerCase());
    const isIntermediate = ['intermedio', 'avanzado'].includes(level.toLowerCase());
    const isAdvanced = ['maestro', 'experto'].includes(level.toLowerCase());

    const selectedConfig = isBeginner
        ? levelConfig.beginner
        : isIntermediate
        ? levelConfig.intermediate
        : levelConfig.advanced;

    // Configuración de ejercicios y planificación
    const bodyweightExercisesList = bodyweightExercises.bodyweight;

    // Configuración de calentamientos
    const warmUp = await this.createWarmUpPlan();

    const workoutSplit = Array.from({ length: frequency }, (_, index) => {
        const exercisesPerDay = 8; // 8 ejercicios por día

        // Mezclar los ejercicios disponibles
        const shuffledExercises = [...bodyweightExercisesList].sort(() => Math.random() - 0.5);

        // Seleccionar ejercicios para este día
        const selectedExercises = shuffledExercises.slice(0, exercisesPerDay);

        return {
            day: index + 1,
            warmUp: warmUp,
            exercises: selectedExercises.map(exercise => ({
                name: exercise.name,
                variation: exercise.variations.length > 0
                    ? exercise.variations[Math.floor(Math.random() * exercise.variations.length)]
                    : null,
                sets: selectedConfig.sets[Math.floor(Math.random() * selectedConfig.sets.length)],
                reps: selectedConfig.reps[Math.floor(Math.random() * selectedConfig.reps.length)],
                rest: selectedConfig.rest,
            })),
        };
    });

    return workoutSplit;
  }


  async createWarmUpPlan() {
      // Configuración de calentamientos
      const maxDuration = 10; // Máximo de 10 minutos
      const maxExercises = 5; // Máximo de 5 ejercicios
      const setDuration = 30; // Duración de cada set en segundos
      const totalSets = Math.floor((maxDuration * 60) / setDuration / maxExercises); // Sets por ejercicio

      // Lista de ejercicios de calentamiento
      const warmUpExercisesList = warmUpExercises.warmUp;

      // Mezclar ejercicios y seleccionar los primeros 5
      const shuffledExercises = [...warmUpExercisesList].sort(() => Math.random() - 0.5);
      const selectedExercises = shuffledExercises.slice(0, maxExercises);

      // Crear plan de calentamiento
      const warmUpPlan = selectedExercises.map(exercise => ({
          name: exercise.name,
          variation: exercise.variations.length > 0
              ? exercise.variations[Math.floor(Math.random() * exercise.variations.length)]
              : null,
          sets: totalSets,
          setDuration: `${setDuration} s`,
      }));

      return warmUpPlan;
  }


  async saveWorkout(workout, token) {
    try {
      const decoded = this.jwtService.decode(token);
      const userId = decoded.id;
      const newWorkout = {
        ...workout,
        user: userId
      }
      return await this.workoutsRepository.create(newWorkout);
    } catch (error) {
      
    }
  }


  findAll() {
    return `This action returns all workouts`;
  }

  async findOne(token: string) {
    try {
      const decoded = this.jwtService.decode(token);
      const userId = decoded.id;
      return await this.workoutsRepository.findByUserId(userId);
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  async remove(id: string) {
    try {
      return await this.workoutsRepository.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
