import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { GymsRepository } from './gyms.repository';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsRepository: GymsRepository,
    private readonly gymsService: GymsService
  ) {}

  async create(createGymDto: CreateGymDto) {
    try{
      const slug = await this.gymsRepository.findBySlug(createGymDto.slug);
      if (slug) {
        throw new BadRequestException('Slug already exists');
      }
      return this.gymsRepository.create(createGymDto);
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
      const gym = await this.gymsService.findById(id);
      if (!gym) {
        throw new BadRequestException('Gym not found');
      }
      return this.gymsRepository.update(gym.id, updateGymDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try{
      await this.gymsRepository.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
