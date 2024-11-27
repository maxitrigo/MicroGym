import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { WorkoutsRepository } from './workouts.repository';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout]), JwtModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, WorkoutsRepository],
  
})
export class WorkoutsModule {}
