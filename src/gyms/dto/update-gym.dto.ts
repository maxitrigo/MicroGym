import { PartialType } from '@nestjs/mapped-types';
import { CreateGymDto } from './create-gym.dto';

export class UpdateGymDto extends PartialType(CreateGymDto) {
    name?: string;

    address?: string;

    phone?: string;

    email?: string;

    owner?: string;

    image?: string;

    description?: string;

    openHours?: string;

    closeHours?: string;
}
