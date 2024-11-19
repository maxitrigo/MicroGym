import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Suscription } from "./entities/suscription.entity";
import { Repository } from "typeorm";
import { CreateSuscriptionDto } from "./dto/create-suscription.dto";

@Injectable()
export class SuscriptionsRepository {
    constructor(
        @InjectRepository( Suscription ) private readonly suscriptionsRepository: Repository<Suscription>
    ) {}

    async create (suscription: CreateSuscriptionDto) {
        console.log('log repository',suscription);
        
        return await this.suscriptionsRepository.save(suscription);
    }

    async findOne(id: string) {
        return await this.suscriptionsRepository.findOneBy({id});
    }

    async findByGymId(id: string) {
        return await this.suscriptionsRepository.find({where: {gymId: id}});
    }

    async remove(id: string) {
        return await this.suscriptionsRepository.delete(id);
    }
}