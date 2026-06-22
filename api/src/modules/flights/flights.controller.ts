import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFlightDto, CreateFlightResponseDto } from './dto/create-flight.dto';
import { UpdateStatusFlightDto, UpdateStatusFlightResponseDto } from './dto/updateStatus-flight.dto';
import { getAllFlightResponseDto } from './dto/getAll-flight.dto';

@ApiTags('Рейсы')
@Controller('flights')
export class FlightsController {
    constructor(private readonly flightsService: FlightsService) {}

    @ApiOperation({summary: 'Создание рейса'})
    @ApiResponse({status: 201, type: CreateFlightResponseDto })
    @Post()
    async create(@Body() dto: CreateFlightDto): Promise<CreateFlightResponseDto> {
        const meta = await this.flightsService.create(dto);

        return { 
            statusCode: 201,
            meta
        };
    }

    @ApiOperation({summary: 'Обновить статус рейса'})
    @ApiResponse({status: 200, type: UpdateStatusFlightResponseDto })
    @Patch(':flightNumber/:status')
    async update(@Param() params: UpdateStatusFlightDto): Promise<UpdateStatusFlightResponseDto> {
        const meta = await this.flightsService.updateStatus(params);

        return { 
            statusCode: 200,
            meta
        };
    }

    @ApiOperation({summary: 'Получить все рейсы'})
    @ApiResponse({status: 200, type: getAllFlightResponseDto })
    @Get()
    async getAll(): Promise<getAllFlightResponseDto> {
        const meta = await this.flightsService.getAll();

        return { 
            statusCode: 200,
            meta
        };
    }
}
