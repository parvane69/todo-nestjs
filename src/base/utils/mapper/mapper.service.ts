import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

type MapReturn<T, V> = V extends Array<any> ? T[] : T;

@Injectable()
export class MapperService {
  public map<T, V>(
    sourceObj: V,
    destinationClass: ClassConstructor<T>,
  ): MapReturn<T, V> {
    return plainToInstance<T, V>(destinationClass, sourceObj, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
      exposeUnsetFields: false,
      strategy: 'exposeAll',
    }) as MapReturn<T, V>;
  }

  public mapAndDeserializeJSON<T, V>(
    sourceObj: any,
    destinationClass: ClassConstructor<T>,
  ): MapReturn<T, V> {
    return this.map(JSON.parse(sourceObj) as V, destinationClass);
  }

  public mapStringObjectToObject<T>(string: any): T {
    return JSON.parse(JSON.stringify(string), (key, value) =>
      this.parseToObj(key, value),
    );
  }

  private parseToObj(key: string, value: any): any {
    if (key && value && typeof value === 'string' && value.includes('{')) {
      value = JSON.parse(value, (key: string, value: any) =>
        this.parseToObj(key, value),
      );
    }
    return value;
  }
}
