import { Column, DataType, Model, Table } from "sequelize-typescript";
import * as flightTypes from './flights.types'

@Table({tableName: 'flights'})
export class Flight extends Model<Flight, flightTypes.flightsCreationAttrs> {
    @Column({type: DataType.STRING(8), allowNull: false, primaryKey: true})
    declare flightNumber: string;

    @Column({type: DataType.TEXT, allowNull: false, defaultValue: 'checkin'})
    declare status: flightTypes.flightsStatus;

    @Column({type: DataType.STRING(4), allowNull: false})
    declare departure: string;

    @Column({type: DataType.STRING(4), allowNull: false})
    declare arrival: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    declare blockTime: number;

    @Column({type: DataType.TEXT, allowNull: false})
    declare route: string;
}