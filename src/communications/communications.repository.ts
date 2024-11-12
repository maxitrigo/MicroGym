import { Injectable } from "@nestjs/common";
import { Communication } from "./entities/communication.entity";
import { LessThan, Repository } from "typeorm";
import { CreateCommunicationDto } from "./dto/create-communication.dto";
import { UpdateCommunicationDto } from "./dto/update-communication.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommunicationsRepository {
    constructor(
        @InjectRepository(Communication) private readonly communicationsRepository: Repository<Communication>
    ) {}

    async findByGymId(gymId: string): Promise<Communication[]> {
        return await this.communicationsRepository.find({ where: { gymId } });
    }

    async create(title: string, message: string, gymId: string): Promise<Communication> {
        
        const newCommunication = new Communication();
        newCommunication.title = title
        newCommunication.message = message;
        newCommunication.gymId = gymId;
        console.log(newCommunication);
        
        return await this.communicationsRepository.save(newCommunication);
    }

    async update(id: string, communication: UpdateCommunicationDto ): Promise<Communication> {
        await this.communicationsRepository.update({ id }, communication);
        return await this.communicationsRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<Communication> {
        const communication = await this.communicationsRepository.findOneBy({ id });
        return await this.communicationsRepository.remove(communication);    
    }

    async deleteOldCommunications() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        await this.communicationsRepository.delete({ createdAt: LessThan(sevenDaysAgo) });
    }

}