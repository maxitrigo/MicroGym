import { PartialType } from '@nestjs/swagger';
import { CreateGymMembershipDto } from './create-gym-membership.dto';

export class UpdateGymMembershipDto extends PartialType(CreateGymMembershipDto) {}
