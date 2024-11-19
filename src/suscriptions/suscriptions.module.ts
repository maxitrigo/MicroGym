import { forwardRef, Module } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { SuscriptionsController } from './suscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';
import { SuscriptionsRepository } from './suscriptions.repository';
import { GymsModule } from 'src/gyms/gyms.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Suscription]), forwardRef(() => GymsModule), JwtModule],
  controllers: [SuscriptionsController],
  providers: [SuscriptionsService, SuscriptionsRepository],
  exports: [SuscriptionsService],
})
export class SuscriptionsModule {}
