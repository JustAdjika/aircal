import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FlightsRepository } from './flights.repository';
import { CreateFlightDto, CreateFlightMetaDto } from './dto/create-flight.dto';

import * as flightsTypes from './flights.types'
import { UpdateStatusFlightDto, UpdateStatusFlightMetaDto } from './dto/updateStatus-flight.dto';
import { getAllFlightMetaDto } from './dto/getAll-flight.dto';

@Injectable()
export class FlightsService {
    constructor(private readonly flightsRepository: FlightsRepository) {}

    async create(dto: CreateFlightDto): Promise<CreateFlightMetaDto> {
        const foundConflict = await this.flightsRepository.findByFlightNumber(dto.flightNumber);
        if(foundConflict) throw new HttpException('A flight with same number already exists', HttpStatus.CONFLICT);

        const newFlight = await this.flightsRepository.new({ ...dto, status: flightsTypes.flightsStatus.CHECK_IN });

        return { context: `Flight ${dto.flightNumber} created`, newFlight }
    }

    async updateStatus(dto: UpdateStatusFlightDto): Promise<UpdateStatusFlightMetaDto> {
        const foundFlight = await this.flightsRepository.findByFlightNumber(dto.flightNumber);
        if(!foundFlight) throw new HttpException('Flight undefined', HttpStatus.NOT_FOUND);

        await this.flightsRepository.updateStatus(foundFlight, dto.status);

        return { context: `Flight ${dto.flightNumber} set status '${dto.status}'` };
    } 

    async getAll(): Promise<getAllFlightMetaDto> {
        const flightList = await this.flightsRepository.findAll();

        return { context: `View all flights list`, flightList };
    }
}
