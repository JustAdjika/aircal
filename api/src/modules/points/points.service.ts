import { Injectable } from '@nestjs/common';
import { PointsRepository } from './points.repository';
import { CreatePointDto } from './dto/create-point.dto';

@Injectable()
export class PointsService {
    constructor(private readonly pointsRepository: PointsRepository) {}

    async createPoint(dto: CreatePointDto) {
        
    }
}
