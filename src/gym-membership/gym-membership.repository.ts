import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GymMembership } from "./entities/gym-membership.entity";
import { CreateGymMembershipDto } from "./dto/create-gym-membership.dto";

@Injectable()
export class GymMembershipRepository {
    constructor(
        @InjectRepository( GymMembership ) private readonly gymMembershipRepository: Repository<GymMembership>
    ) {}

    async create (membership: CreateGymMembershipDto) {
        console.log('log repository',membership);
        
        return await this.gymMembershipRepository.save(membership);
    }

    async findAll() {
        return await this.gymMembershipRepository.find();
    }

    async findOne(id: string) {
        return await this.gymMembershipRepository.findOneBy({id});
    }

    async findByGymId(id: string) {
        return await this.gymMembershipRepository.find({where: {gymId: id}});
    }

    async remove(id: string) {
        return await this.gymMembershipRepository.delete(id);
    }
}