import { PartialType } from '@nestjs/mapped-types';
import { CreateGymDto } from './create-gym.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGymDto extends PartialType(CreateGymDto) {
    @ApiProperty({ example: 'Esparta' })
    name?: string;

    @ApiProperty({ example: 'Calle falsa 1234' })
    address?: string;

    @ApiProperty({ example: '099876543' })
    phone?: string;

    @ApiProperty({ example: 'info@esparta.com' })
    email?: string;

    @ApiProperty({ example: 'http://localhost:3000/images/esparta.png' })
    image?: string;

    @ApiProperty({ example: 'una descripcion detallada o no detallada' })
    description?: string;

    @ApiProperty({ example: '10:00' })
    openHours?: string;

    @ApiProperty({ example: '20:00' })
    closeHours?: string;

    @ApiProperty({ example: '100' })
    capacity?: number;

    @ApiProperty({ example: '82474-234709-82374239-8234' })
    mercadoPago?: string

    // Agregar la propiedad subscriptionEnd aquí
    @ApiProperty({ example: '2024-12-05' })
    subscriptionEnd: Date; // Asegúrate de definir esta propiedad
}
