import { Module } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { GymsController } from './gyms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gym } from './entities/gym.entity';
import { GymsRepository } from './gyms.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gym]) , UsersModule, JwtModule],
  controllers: [GymsController],
  providers: [GymsService, GymsRepository],
  exports: [GymsService],
})
export class GymsModule {}
