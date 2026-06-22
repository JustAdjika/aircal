import { Module } from "@nestjs/common";
import { PointsModule } from './modules/points/points.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { CargoModule } from './modules/cargo/cargo.module';
import { FlightsModule } from './modules/flights/flights.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_NAME,
      models: [],
      autoLoadModels: true,
      logging: false
    }),
    PointsModule,
    CargoModule,
    FlightsModule
  ]
})
export class AppModule {}