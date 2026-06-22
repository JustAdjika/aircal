import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePassengerDto, CreatePassengerResponseDto } from './dto/create-passenger.dto';
import { DeletePassengerDto, DeletePassengerResponseDto } from './dto/delete-passenger.dto';
import { GetPassengersByFlightDto, GetPassengersByFlightResponseDto } from './dto/get-passengers-by-flight.dto';

@ApiTags('Пассажиры')
@Controller('passengers')
export class PassengersController {
    constructor( private readonly passengerService: PassengersService ) {}

    @ApiOperation({summary: 'Регистрация пассажира'})
    @ApiResponse({status: 201, type: CreatePassengerResponseDto })
    @Post()
    async create(@Body() dto: CreatePassengerDto): Promise<CreatePassengerResponseDto> {
        const meta = await this.passengerService.create(dto);

        return { 
            statusCode: 201,
            meta
        };
    }

    @ApiOperation({summary: 'Удалить пассажира'})
    @ApiResponse({status: 200, type: DeletePassengerResponseDto })
    @Delete(':ticketId')
    async delete(@Param() params: DeletePassengerDto): Promise<DeletePassengerResponseDto> {
        const meta = await this.passengerService.delete(params)

        return { 
            statusCode: 200,
            meta
        };
    }

    @ApiOperation({summary: 'Получить всех пассажиров рейса'})
    @ApiResponse({status: 200, type: GetPassengersByFlightResponseDto })
    @Get(':flightNumber')
    async getByFlight(@Param() params: GetPassengersByFlightDto): Promise<GetPassengersByFlightResponseDto> {
        const meta = await this.passengerService.getByFlight(params)

        return { 
            statusCode: 200,
            meta
        };
    }
}
