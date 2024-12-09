import { forwardRef, Module } from '@nestjs/common';
import { GymMembershipService } from './gym-membership.service';
import { GymMembershipController } from './gym-membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymMembership } from './entities/gym-membership.entity';
import { JwtModule } from '@nestjs/jwt';
import { GymMembershipRepository } from './gym-membership.repository';
import { GymsModule } from 'src/gyms/gyms.module';

@Module({
  imports: [TypeOrmModule.forFeature([GymMembership]), JwtModule, forwardRef(() => GymsModule)],
  controllers: [GymMembershipController],
  providers: [GymMembershipService, GymMembershipRepository],
  exports: [GymMembershipService],
})
export class GymMembershipModule {}
