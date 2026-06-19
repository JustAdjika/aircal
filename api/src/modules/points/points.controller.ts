import { Body, Controller, Post } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {

    constructor(private readonly pointsService: PointsService) {}

    @Post()
    create(@Body() dto: CreatePointDto) {
    }

}
