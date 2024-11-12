import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommunicationDto } from './create-communication.dto';

export class UpdateCommunicationDto extends PartialType(CreateCommunicationDto) {
    @ApiProperty({ example: '26590394823-42398462909-07987' })
    gymId: string;

    @ApiProperty({ example: 'Descuento' })
    title?: string;

    @ApiProperty({ example: 'Cuerpo del descuento' })
    message?: string;
}
