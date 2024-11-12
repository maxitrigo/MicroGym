import { ApiProperty } from "@nestjs/swagger";

export class CreateCommunicationDto {
    @ApiProperty({ example: 'Descuento' })
    title: string;

    @ApiProperty({ example: 'Cuerpo del descuento' })
    message: string;
}
