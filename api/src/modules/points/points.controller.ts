import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePointDto, CreatePointResponseDto } from './dto/create-point.dto';
import { PointsService } from './points.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Аэропорты')
@Controller('points')
export class PointsController {

    constructor(private readonly pointsService: PointsService) {}

    @ApiOperation({summary: 'Создание аэропорта'})
    @ApiResponse({status: 201, type: CreatePointResponseDto })
    @Post('add')
    async create(@Body() dto: CreatePointDto) {
        await this.pointsService.createPoint(dto)

        return { 
            statusCode: 201, 
            meta: {
                context: `Point ${dto.ICAO} created`
            } 
        }
    }

}
