import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Gym } from "./entities/gym.entity";
import { CreateGymDto } from "./dto/create-gym.dto";
import { UpdateGymDto } from "./dto/update-gym.dto";

@Injectable()
export class GymsRepository {
    constructor(
        @InjectRepository(Gym) private readonly gymsRepository: Repository<Gym>
    ) {}

    async findAll(): Promise<Gym[]> {
        return await this.gymsRepository.find();
    }

    async findById(id: string): Promise<Gym> {
        return await this.gymsRepository.findOneBy({ id });
    }

    async findBySlug(slug: string): Promise<Gym> {
        return await this.gymsRepository.findOneBy({ slug });
    }

    async findUsersByGymId(gymId: string): Promise<Gym> {
        return await this.gymsRepository.findOne({ where: { id: gymId }, relations: ['users', 'users.workouts'] });
    }

    async create(owner: string, gym: CreateGymDto): Promise<Gym> {
        await this.gymsRepository.create(gym);
        gym.owner = owner;
        gym.subscriptionEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return await this.gymsRepository.save(gym);
    }

    async update(id: string, gym: UpdateGymDto): Promise<Gym> {
        await this.gymsRepository.update({ id }, gym);
        return await this.gymsRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<Gym> {
        const gym = await this.gymsRepository.findOneBy({ id });
        return await this.gymsRepository.remove(gym);    
    }
}