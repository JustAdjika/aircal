import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PointsRepository } from './points.repository';
import { CreatePointDto } from './dto/create-point.dto';
import { logger } from 'src/common/utilities/logger';

@Injectable()
export class PointsService {
    constructor(private readonly pointsRepository: PointsRepository) {}

    async createPoint(dto: CreatePointDto) { 
        if(await this.pointsRepository.findByICAO(dto.ICAO)) throw new HttpException('A point with the same ICAO already exists', HttpStatus.CONFLICT);
        if(await this.pointsRepository.findByIATA(dto.IATA)) throw new HttpException('A point with the same IATA already exists', HttpStatus.CONFLICT);
        
        await this.pointsRepository.newPoint(dto);
    }
}
