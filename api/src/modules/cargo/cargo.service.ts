import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CargoRepository } from './cargo.repository';
import { CreateCargoDto, CreateCargoMetaDto } from './dto/create-cargo.dto';
import { GenerateId } from 'src/common/utilities/generatorId';
import { DeleteCargoDto, DeleteCargoMetaDto } from './dto/delete-cargo.dto';
import { GetCargoByTicketDto, GetCargoByTicketMetaDto } from './dto/get-cargo-by-ticket.dto';
import { GetCargoByFlightDto, GetCargoByFlightMetaDto } from './dto/get-cargo-by-flight.dto';
import { logger } from 'src/common/utilities/logger';

@Injectable()
export class CargoService {
    constructor(private readonly cargoRepository: CargoRepository) {}

    async create(dto: CreateCargoDto): Promise<CreateCargoMetaDto> {
        let cargoId;

        for(let i = 0; i <= 30; i++) {
            if(i == 30) throw new HttpException('Failed to generate unique cargo ID', HttpStatus.INTERNAL_SERVER_ERROR);

            const newId = new GenerateId();

            const foundConflict = await this.cargoRepository.findByCargoId(newId.id);
            if(!foundConflict) {
                cargoId = newId.id
                break; 
            }
        }
        
        console.log(cargoId);

        await this.cargoRepository.new({ ...dto, cargoId: cargoId });
        
        return { context: `Cargo ${cargoId} registered`, cargoId };
    }

    async delete(dto: DeleteCargoDto): Promise<DeleteCargoMetaDto> {
        const foundCargo = await this.cargoRepository.findByCargoId(dto.cargoId); 
        if(!foundCargo) throw new HttpException('Cargo undefined', HttpStatus.NOT_FOUND);

        await this.cargoRepository.delete(foundCargo);

        return { context: `Cargo ${dto.cargoId} deleted` };
    }

    async getByTicket(dto: GetCargoByTicketDto): Promise<GetCargoByTicketMetaDto> {
        const cargoList = await this.cargoRepository.findByTicket(dto.ticketId)

        return { context: `View all cargo for passanger ${dto.ticketId}`, cargoList }
    }

    async getByFlight(dto: GetCargoByFlightDto): Promise<GetCargoByFlightMetaDto> {
        const cargoList = await this.cargoRepository.findByFlightNumber(dto.flightNumber)

        return { context: `View all cargo for flight ${dto.flightNumber}`, cargoList }
    }
}