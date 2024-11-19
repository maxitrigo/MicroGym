import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name?: string
    admissions?: number
    points?: number
    trainingDates?: string[]
    freePass?: boolean
    subscriptionEnd?: Date
    status?: string
    gymId?: string;
}
