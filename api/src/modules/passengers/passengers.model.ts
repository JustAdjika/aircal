import { Column, DataType, Model, Table } from "sequelize-typescript";
import * as passengersTypes from './passengers.types'

@Table({tableName: 'passengers'})
export class Passenger extends Model<Passenger, passengersTypes.passengersCreationAttrs> {
    @Column({type: DataType.TEXT, allowNull: false})
    declare name: string;

    @Column({type: DataType.STRING(4), allowNull: false})
    declare seat: string;

    @Column({type: DataType.STRING(8), allowNull: false})
    declare flightNumber: string;

    @Column({type: DataType.STRING(8), allowNull: false, primaryKey: true})
    declare ticketId: string;

    @Column({type: DataType.TEXT, allowNull: false, defaultValue: 'classic'})
    declare type: passengersTypes.ticketType
}