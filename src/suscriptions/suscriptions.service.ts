import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { SuscriptionsRepository } from './suscriptions.repository';
import { JwtService } from '@nestjs/jwt';
import { GymsService } from 'src/gyms/gyms.service';

@Injectable()
export class SuscriptionsService {
  constructor(
    private readonly suscriptionsRepository: SuscriptionsRepository,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => GymsService))
    private readonly gymsService: GymsService
  ) {}

  async create(Body) {
    const decodedGym = this.jwtService.decode(Body.gymToken);
    const gymId = decodedGym.id
    const data = {
      name: Body.name,
      description: Body.description,
      price: Body.price,
      duration: Body.duration,
      freePass: Body.freePass,
      admissions: Body.admissions,
      gymId: gymId
    }
    return await this.suscriptionsRepository.create(data);
  }

  findAll() {
    return `This action returns all suscriptions`;
  }

  async findByGymId(id: string) {
    const decodedGym = this.jwtService.decode(id)
    const gymId = decodedGym.id
    return await this.suscriptionsRepository.findByGymId(gymId);
  }

  async findOne(id: string) {
    return await this.suscriptionsRepository.findOne(id);
  }


  async remove(id: string, gymToken: string, token: string) {
    const decodedUser = this.jwtService.decode(token);
    const owner = decodedUser.id;
    const decodedGym = this.jwtService.decode(gymToken);
    const gymId = decodedGym.id
    const gym = await this.gymsService.findById(gymId);
    if (!gym) {
      throw new BadRequestException('gym not found');
    }
    if (gym.owner !== owner) {
      throw new BadRequestException('You are not the owner of this gym');
    }
    return this.suscriptionsRepository.remove(id);
  }
}
