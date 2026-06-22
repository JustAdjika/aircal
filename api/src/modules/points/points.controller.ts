import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePointDto, CreatePointResponseDto } from './dto/create-point.dto';
import { PointsService } from './points.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeletePointDto, DeletePointResponseDto } from './dto/delete-point.dto';
import { UpdatePointBodyDto, UpdatePointParamsDto, UpdatePointResponseDto } from './dto/update-point.dto';

@ApiTags('Аэропорты')
@Controller('points')
export class PointsController {

    constructor(private readonly pointsService: PointsService) {}

    @ApiOperation({summary: 'Создание аэропорта'})
    @ApiResponse({status: 201, type: CreatePointResponseDto })
    @Post()
    async create(@Body() dto: CreatePointDto): Promise<CreatePointResponseDto> {
        const meta = await this.pointsService.createPoint(dto);

        return { 
            statusCode: 201,
            meta
        };
    }

    @ApiOperation({summary: 'Удаление аэропорта'})
    @ApiResponse({status: 200, type: DeletePointResponseDto})
    @Delete(':ICAO')
    async delete(@Param() params: DeletePointDto): Promise<DeletePointResponseDto> {
        const meta = await this.pointsService.deletePoint(params);

        return {
            statusCode: 200,
            meta
        }
    }

    @ApiOperation({summary: 'Изменение аэропорта'})
    @ApiResponse({status: 200, type: UpdatePointResponseDto})
    @Put(':ICAO')
    async update(@Param() params: UpdatePointParamsDto, @Body() dto: UpdatePointBodyDto): Promise<UpdatePointResponseDto> {
        const meta = await this.pointsService.updatePoint(dto, params);
        
        return {
            statusCode: 200,
            meta
        }
    }
}
