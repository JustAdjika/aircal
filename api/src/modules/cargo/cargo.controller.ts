import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCargoDto, CreateCargoResponseDto } from './dto/create-cargo.dto';
import { CargoService } from './cargo.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteCargoDto, DeleteCargoResponseDto } from './dto/delete-cargo.dto';
import { GetCargoByTicketDto, GetCargoByTicketResponseDto } from './dto/get-cargo-by-ticket.dto';
import { GetCargoByFlightDto, GetCargoByFlightResponseDto } from './dto/get-cargo-by-flight.dto';

@ApiTags('Багаж')
@Controller('cargo')
export class CargoController {
    constructor(private readonly cargoService: CargoService) {}

    @ApiOperation({summary: 'Регистрация багажа'})
    @ApiResponse({status: 201, type: CreateCargoResponseDto })
    @Post()
    async create(@Body() dto: CreateCargoDto): Promise<CreateCargoResponseDto> {
        const meta = await this.cargoService.create(dto);

        return {
            statusCode: 200,
            meta,
        }
    }

    @ApiOperation({summary: 'Удаление багажа'})
    @ApiResponse({status: 200, type: DeleteCargoResponseDto })
    @Delete(':cargoId')
    async delete(@Param() params: DeleteCargoDto): Promise<DeleteCargoResponseDto> {
        const meta = await this.cargoService.delete(params);

        return {
            statusCode: 200,
            meta
        }
    }

    @ApiOperation({summary: 'Получение списка багажа пассажира'})
    @ApiResponse({status: 200, type: GetCargoByTicketResponseDto })
    @Get('ticket/:ticketId')
    async getByTicket(@Param() params: GetCargoByTicketDto): Promise<GetCargoByTicketResponseDto> {
        const meta = await this.cargoService.getByTicket(params);

        return {
            statusCode: 200,
            meta
        }
    }

    @ApiOperation({summary: 'Получение списка багажа на рейс'})
    @ApiResponse({status: 200, type: GetCargoByFlightResponseDto })
    @Get('flight/:flightNumber')
    async getByFlight(@Param() params: GetCargoByFlightDto): Promise<GetCargoByFlightResponseDto> {
        const meta = await this.cargoService.getByFlight(params);

        return {
            statusCode: 200,
            meta
        }
    }
}

