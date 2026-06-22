import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassengersRepository } from './passengers.repository';
import { CreatePassengerDto, CreatePassengerMetaDto } from './dto/create-passenger.dto';
import { GenerateId } from 'src/common/utilities/generatorId';
import { DeletePassengerDto, DeletePassengerMetaDto } from './dto/delete-passenger.dto';
import { GetPassengersByFlightDto, GetPassengersByFlightMetaDto } from './dto/get-passengers-by-flight.dto';
import { FlightsService } from '../flights/flights.service';

@Injectable()
export class PassengersService {
    constructor( 
        private readonly passengersRepository: PassengersRepository, 
        private readonly flightsService: FlightsService
    ) {}

    async create(dto: CreatePassengerDto): Promise<CreatePassengerMetaDto> {
        const foundConflictName = await this.passengersRepository.findByName(dto.name);
        const foundConflictSeat = await this.passengersRepository.findBySeat(dto.seat);

        if(foundConflictName || foundConflictSeat) throw new HttpException('Name or seat conflict', HttpStatus.CONFLICT);

        const foundFlight = await this.flightsService.getFlightByNumber(dto.flightNumber);
        if(!foundFlight) throw new HttpException('Flight undefined', HttpStatus.NOT_FOUND);

        let ticketId;

        for(let i = 0; i <= 30; i++) {
            if(i == 30) throw new HttpException('Failed to generate unique ticket ID', HttpStatus.INTERNAL_SERVER_ERROR);

            const newId = new GenerateId();

            const foundConflict = await this.passengersRepository.findByTicket(newId.id);

            if(!foundConflict) {
                ticketId = newId.id
                break; 
            }
        };

        const newTicket = await this.passengersRepository.new({ ...dto, ticketId });

        return { context: `Passenger ${ticketId} registered`, newPassenger: newTicket };
    }

    async delete(dto: DeletePassengerDto): Promise<DeletePassengerMetaDto> {
        const foundTicket = await this.passengersRepository.findByTicket(dto.ticketId);
        if(!foundTicket) throw new HttpException('Ticket undefined', HttpStatus.NOT_FOUND);

        await this.passengersRepository.delete(foundTicket);

        return { context: `Passenger ${dto.ticketId} deleted` };
    }

    async getByFlight(dto: GetPassengersByFlightDto): Promise<GetPassengersByFlightMetaDto> {
        const passengerList = await this.passengersRepository.findByFlight(dto.flightNumber);

        return { context: `View all passengers for flight ${dto.flightNumber}`, passengerList }
    }

    async getTicketById(ticketId: string) {
        return await this.passengersRepository.findByTicket(ticketId);
    }
}
