import { Module } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CommunicationsController } from './communications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { GymsModule } from 'src/gyms/gyms.module';
import { CommunicationsRepository } from './communications.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Communication]), ScheduleModule.forRoot(), GymsModule ],
  controllers: [CommunicationsController],
  providers: [CommunicationsService, CommunicationsRepository],
  exports: [CommunicationsService],
})
export class CommunicationsModule {}
