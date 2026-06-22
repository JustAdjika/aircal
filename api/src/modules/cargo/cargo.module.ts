import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cargo } from './cargo.model';
import { CargoRepository } from './cargo.repository';

@Module({
  providers: [CargoService, CargoRepository],
  controllers: [CargoController],
  imports: [
    SequelizeModule.forFeature([Cargo])
  ]
})
export class CargoModule {}
