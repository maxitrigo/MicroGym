import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name?: string
    admisions?: number
    points?: number
    trainingDates?: string[]
    status?: string
    gymId?: string;
}
