import { IsEnum, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Passenger } from '../passengers.model';

import * as passengersTypes from '../passengers.types'

export class CreatePassengerDto {
    @ApiProperty({ example: 'Иван Иванович', description: 'Имя пассажира' })
    @IsString({message: 'Must be string'})
    readonly name: string;

    @ApiProperty({ example: '132D', description: 'Место пассажира' })
    @Matches(/^\d{3}[A-Z]$/, {message: 'Seat must be in format 111A'})
    readonly seat: string;

    @ApiProperty({ example: 'VSV3732', description: 'Номер рейса' })
    @IsString({message: 'Must be string'})
    readonly flightNumber: string;

    @ApiProperty({ example: 'comfort', description: 'Тип билета' })
    @IsEnum(passengersTypes.ticketType)
    readonly type: passengersTypes.ticketType
}

export class CreatePassengerMetaDto {
    @ApiProperty({ example: 'Passenger AB123456 registered', description: 'Описание успешного выполнения' })
    context: string;

    @ApiProperty({ 
        example: { 
            name: 'Иван Иванович',
            seat: '132D',
            flightNumber: 'VSV3732',
            ticketId: 'AB123456',
            type: 'comfort'
        }, 
        description: 'Зарегистрированный пассажир' 
    })
    newPassenger: Passenger
}

export class CreatePassengerResponseDto {
    @ApiProperty({ example: 201, description: 'Код ответа' })
    statusCode: number;
    
    @ApiProperty({ type: CreatePassengerMetaDto })
    meta: CreatePassengerMetaDto
}