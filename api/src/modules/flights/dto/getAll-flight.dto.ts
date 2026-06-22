import { ApiProperty } from '@nestjs/swagger';
import { Flight } from '../flights.model';

export class getAllFlightMetaDto {
    @ApiProperty({ example: 'View all flights list', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ example: [], description: 'Список всех рейсов' })
    flightList: Flight[]
}

export class getAllFlightResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;
    
    @ApiProperty({ type: getAllFlightMetaDto })
    meta: getAllFlightMetaDto
}