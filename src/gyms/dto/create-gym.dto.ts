import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGymDto {
    @ApiProperty({ example: 'Esparta' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Calle falsa 1234' })
    @IsString()
    address: string;

    @ApiProperty({ example: '099876543' })
    @IsString()
    phone: string;

    @ApiProperty({ example: 'info@esparta.com' })
    @IsString()
    email: string;

    @IsString()
    owner: string;

    @ApiProperty({ example: 'esparta' })
    @IsString()
    slug: string;

    // Agregar la propiedad subscriptionEnd aquí
    @ApiProperty({ example: '2024-12-05' })
    subscriptionEnd: Date; // Asegúrate de definir esta propiedad
}

