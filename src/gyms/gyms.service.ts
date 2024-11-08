import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { GymsRepository } from './gyms.repository';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/Roles/roles.enum';
import { JWT_SECRET } from 'src/config/env.config';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsRepository: GymsRepository,
    private readonly jwtService: JwtService
  ) {}

  async create(token: string, createGymDto: CreateGymDto) {
    try{
      const decoded = this.jwtService.decode(token);
      const owner = decoded.id
      const slug = await this.gymsRepository.findBySlug(createGymDto.slug);

      if (slug) {
        throw new BadRequestException('Slug already exists');
      }

      await this.gymsRepository.create(owner, createGymDto);

      const patchRole = this.jwtService.sign({
        role: Roles.Admin
      }, {secret: JWT_SECRET})
      const response = await axios.patch('http://localhost:3001/auth/role', 
        {
          email: decoded.email,
          role: Roles.Admin
        },
        {
          headers: { 'Authorization': `Bearer ${patchRole}` }
        }
      );

      const newToken = response.data
      const newGym = await this.gymsRepository.findBySlug(createGymDto.slug);
      console.log(newGym);
      
      return { gym: newGym, token: newToken.newToken };

    } catch (error) {
      console.log(error);
      
    }
  }

  async findAll() {
    try{
      return this.gymsRepository.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string) {
    try{
      return await this.gymsRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async findBySlug(slug: string) {
    try{
      return await this.gymsRepository.findBySlug(slug);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateGymDto: UpdateGymDto) {
    try{
      const gym = await this.gymsRepository.findById(id);
      if (!gym) {
        throw new BadRequestException('Gym not found');
      }
      return this.gymsRepository.update(gym.id, updateGymDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string, token: string) {
    try{
      const decoded = this.jwtService.decode(token);
      const gym = await this.gymsRepository.findById(id);
      if (decoded.id !== gym.owner) {
        throw new BadRequestException('You are not the owner of this gym');
      }
      await this.gymsRepository.remove(id);
      await axios.patch('http://localhost:3001/auth/role', 
        {
          email: decoded.email,
          role: Roles.User
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
