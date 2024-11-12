import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository( User ) private readonly usersRepository: Repository<User>
    ) {}

    async create( id: string, name: string, gymId: string,) {
        return await this.usersRepository.save({id, name, gymId});
    }

    async findOneById(id: string) {
        return await this.usersRepository.findOneBy({id});
    }
}