import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async create(gymId: string, token: string) {
    const decoded = this.jwtService.decode(token);
    const user = await this.usersRepository.create(decoded.id, decoded.name, gymId);
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(token: string) {
    const decoded = this.jwtService.decode(token);
    const user = await this.usersRepository.findOneById(decoded.id);
    return user
  }

  async update(token: string, updateUserDto: UpdateUserDto) {
    const decoded = this.jwtService.decode(token);
    return this.usersRepository.update(decoded.id, updateUserDto);
  }

  async logTrain(token: string) {
    const decoded = this.jwtService.decode(token);
    const date = new Date();
    const formatedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    
    const user = await this.usersRepository.findOneById(decoded.id);
    
    // Asegurarse de que trainingDates exista
    if (!user.trainingDates) {
      user.trainingDates = [];
      await this.usersRepository.update(decoded.id, { trainingDates: user.trainingDates });
    }
  
    // Eliminar cualquier valor null o indefinido de trainingDates
    user.trainingDates = user.trainingDates.filter(date => date != null);
  
    // Comprobar si la fecha ya está en el array
    if (!user.trainingDates.includes(formatedDate)) {
      user.trainingDates.push(formatedDate);
      await this.usersRepository.update(decoded.id, { trainingDates: user.trainingDates });
    }
  
    return { message: 'Training date logged successfully' };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
