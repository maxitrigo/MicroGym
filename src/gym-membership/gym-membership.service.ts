import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { GymsService } from 'src/gyms/gyms.service';
import { JwtService } from '@nestjs/jwt';
import { GymMembershipRepository } from './gym-membership.repository';

@Injectable()
export class GymMembershipService {
  constructor(
    @Inject(forwardRef(() => GymsService))
    private readonly gymsService: GymsService,
    private readonly jwtService: JwtService,
    private readonly gymMembershipRepository: GymMembershipRepository
  ) {
    console.log('gymsService:', gymsService);
    console.log('jwtService:', jwtService);
    console.log('gymMembershipRepository:', gymMembershipRepository);
  }
  async create(Body) {
    const decodedGym = this.jwtService.decode(Body.gymToken);
    const gymId = decodedGym.id
    const data = {
      name: Body.name,
      description: Body.description,
      price: Body.price,
      duration: Body.duration,
      role: Body.role,
      gymId: gymId
    }
    return await this.gymMembershipRepository.create(data);
  }

  findAll() {
    return this.gymMembershipRepository.findAll();
  }

  async findOne(id: string) {
    return await this.gymMembershipRepository.findOne(id);
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
    return this.gymMembershipRepository.remove(id);
  }
}
