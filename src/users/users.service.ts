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
    console.log(decoded);
    
    const user = await this.usersRepository.create(decoded.id, decoded.name, gymId);
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(token: string) {
    const decoded = this.jwtService.decode(token);
    console.log(decoded);
    const user = await this.usersRepository.findOneById(decoded.id);
    console.log(user);
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
