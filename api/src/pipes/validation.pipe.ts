import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const { metatype } = metadata

        if( !metatype ) return value

        const obj = plainToInstance(metatype, value);
        const errors = await validate(obj);

        if(errors.length > 0) {
            throw new HttpException(`${errors[0].property} - ${Object.values(errors[0].constraints ?? {}).join(', ')}`, HttpStatus.BAD_REQUEST)
        }
        return value
    }
}