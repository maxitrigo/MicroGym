import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workout } from "./entities/workout.entity";
import { Repository } from "typeorm";
import { CreateWorkoutDto } from "./dto/create-workout.dto";

@Injectable()
export class WorkoutsRepository {
    constructor(
        @InjectRepository(Workout) private readonly repository: Repository<Workout>
    ) {}

    async create(workout: CreateWorkoutDto) {
        return await this.repository.save(workout);
    }

    async findByUserId(userId: string) {
        return await this.repository.find({
          where: { user: { id: userId } },
          select: ['id', 'type', 'level', 'dailyPlans', 'createdAt'],  // Selecciona solo los campos del workout
        });
    }

    async remove(id: string) {
        return await this.repository.delete(id);
    }

}