import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import * as flightsTypes from '../flights.types'

export class UpdateStatusFlightDto {
    @ApiProperty({ example: 'VSV3732', description: 'Номер рейса' })
    @IsString({message: 'Must be string'})
    flightNumber: string;

    @ApiProperty({ example: 'checkin', description: 'Статус рейса' })
    @IsEnum(flightsTypes.flightsStatus)
    status: flightsTypes.flightsStatus;
}

export class UpdateStatusFlightMetaDto {
    @ApiProperty({ example: `Flight VSV3732 set status 'checkin'`, description: 'Описание успешного выполнения' })
    context: string;
}

export class UpdateStatusFlightResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;
    
    @ApiProperty({ type: UpdateStatusFlightMetaDto })
    meta: UpdateStatusFlightMetaDto
}