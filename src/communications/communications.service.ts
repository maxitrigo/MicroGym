import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { CommunicationsRepository } from './communications.repository';
import { GymsService } from 'src/gyms/gyms.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommunicationsService {
  constructor(
    private readonly communicationsRepository: CommunicationsRepository,
    private readonly gymsService: GymsService,
    private readonly jwtService: JwtService
  ){}

  async create(title, message, token: string, gymToken: string) {
    const decodedUser = this.jwtService.decode(token);
    const decodedGym = this.jwtService.decode(gymToken);
    const owner = decodedUser.id
    const gymId = decodedGym.id
    
    const gym = await this.gymsService.findById(gymId);
    if(!gym){
      throw new BadRequestException('gym not found')
    }
    if (gym.owner !== owner) {
      throw new BadRequestException('You are not the owner of this gym');
    }
    try {      
      return await this.communicationsRepository.create(title, message, gym.id);
    } catch (error) {
      console.log(error);
    }
  }

  async findByGymId(id: string) {
    try {
      const decoded = this.jwtService.decode(id)
      const gymId = decoded.id
      return await this.communicationsRepository.findByGymId(gymId);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateCommunicationDto: UpdateCommunicationDto) {
    try {
      return await this.communicationsRepository.update(id, updateCommunicationDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteOldCommunications() {
    await this.communicationsRepository.deleteOldCommunications();
  }

  async remove(id: string, gymToken: string, token: string) {
    const decodedUser = this.jwtService.decode(token);
    const owner = decodedUser.id
    const decodedGym = this.jwtService.decode(gymToken);
    const gymId = decodedGym.id
    const gym = await this.gymsService.findById(gymId);
    if(!gym){
      throw new BadRequestException('gym not found')
    }
    if (gym.owner !== owner) {
      throw new BadRequestException('You are not the owner of this gym');
    }
    try {
      return await this.communicationsRepository.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
