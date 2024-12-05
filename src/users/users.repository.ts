import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";

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

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.usersRepository.update({id}, updateUserDto);
    }

      // Función para actualizar muchos usuarios a la vez
    async updateMany(where: object, updateData: object) {
        return await this.usersRepository.update(where, updateData);
    }

    async delete(id: string) {
        return await this.usersRepository.delete(id);
    }
}