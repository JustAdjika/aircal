import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { FlightsRepository } from './flights.repository';
import { Flight } from './flights.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService, FlightsRepository],
  imports: [
    SequelizeModule.forFeature([Flight])
  ]
})
export class FlightsModule {}
