import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PointsRepository } from './points.repository';
import { CreatePointDto, CreatePointMetaDto } from './dto/create-point.dto';
import { DeletePointDto, DeletePointMetaDto } from './dto/delete-point.dto';
import { UpdatePointBodyDto, UpdatePointMetaDto, UpdatePointParamsDto } from './dto/update-point.dto';

@Injectable()
export class PointsService {
    constructor(private readonly pointsRepository: PointsRepository) {}

    async createPoint(dto: CreatePointDto): Promise<CreatePointMetaDto> { 
        if(await this.pointsRepository.findByICAO(dto.ICAO)) throw new HttpException('A point with the same ICAO already exists', HttpStatus.CONFLICT);
        if(await this.pointsRepository.findByIATA(dto.IATA)) throw new HttpException('A point with the same IATA already exists', HttpStatus.CONFLICT);
        
        await this.pointsRepository.new(dto);

        return { context: `Point ${dto.ICAO} created` }
    }

    async deletePoint(dto: DeletePointDto): Promise<DeletePointMetaDto> {
        const foundPoint = await this.pointsRepository.findByICAO(dto.ICAO);
        if(!foundPoint) throw new HttpException('Point undefined', HttpStatus.NOT_FOUND);
        
        await this.pointsRepository.delete(foundPoint);

        return { context: `Point ${dto.ICAO} deleted` }
    }

    async updatePoint(dto: UpdatePointBodyDto, params: UpdatePointParamsDto): Promise<UpdatePointMetaDto> {
        const foundPoint = await this.pointsRepository.findByICAO(params.ICAO);
        if(!foundPoint) throw new HttpException('Point undefined', HttpStatus.NOT_FOUND);

        await this.pointsRepository.update(foundPoint, dto);

        return { context: `Point ${params.ICAO} updated` }
    }
}
