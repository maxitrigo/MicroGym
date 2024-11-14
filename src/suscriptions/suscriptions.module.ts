import { Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';
import { SuscriptionsRepository } from './suscriptions.repository';
import { GymsModule } from 'src/gyms/gyms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription]), GymsModule],
  controllers: [SuscriptionsController],
  providers: [SuscriptionsService, SuscriptionsRepository],
})
export class SuscriptionsModule {}
