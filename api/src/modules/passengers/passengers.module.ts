import { Module } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { PassengersRepository } from './passengers.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Passenger } from './passengers.model';
import { FlightsModule } from '../flights/flights.module';

@Module({
  providers: [PassengersService, PassengersRepository],
  controllers: [PassengersController],
  imports: [
    SequelizeModule.forFeature([Passenger]),
    FlightsModule
  ],
  exports: [
    PassengersService
  ]
})
export class PassengersModule {}
