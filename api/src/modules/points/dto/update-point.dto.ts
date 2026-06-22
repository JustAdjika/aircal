import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Matches } from "class-validator";

import * as pointsTypes from '../points.types'

export class UpdatePointBodyDto {
    @ApiProperty({ example: 'Almaty International Airport', description: 'Название аэропорта' })
    @IsString({message: 'Must be string'})
    readonly name: string;

    @ApiProperty({ example: 'international', description: 'Тип аэропорта' })
    @IsEnum(pointsTypes.pointType)
    readonly type: pointsTypes.pointType;

    @ApiProperty({ example: 'ALA', description: 'ИАТА код аэропорта' })
    @Matches(/^[A-Z]{3}$/, {message: 'ICAO contain exactly 3 uppercase Latin letters'})
    readonly IATA: string;
}

export class UpdatePointParamsDto {
    @ApiProperty({ example: 'UAAA', description: 'ИКАО код аэропорта' })
    @Matches(/^[A-Z]{4}$/, {message: 'ICAO contain exactly 4 uppercase Latin letters'})
    readonly ICAO: string;
}

export class UpdatePointMetaDto {
    @ApiProperty({ example: 'Point UAAA updated', description: 'Описание успешного выполнения' })
    context: string
}

export class UpdatePointResponseDto {
    @ApiProperty({ example: 200, description: 'Код ответа' })
    statusCode: number;

    @ApiProperty({ type: UpdatePointMetaDto })
    meta: UpdatePointMetaDto
}