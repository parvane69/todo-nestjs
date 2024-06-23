import { IsIn, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptionalWithApi } from '../../decorator/dto.validator.decorator';

const MAX_COUNT_PAGE = 100;

export interface PaginateOutput<Entity> {
  items: Entity[] | any[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IPaginationMeta extends Record<string, any> {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginationOptions {
  limit: number | string;
  page: number | string;
}

export class Pagination<
  PaginationObject,
  T extends IPaginationMeta = PaginationMeta,
> {
  readonly items: PaginationObject[];
  readonly meta: T;
  constructor(items: PaginationObject[], meta: T) {
    this.items = items;
    this.meta = meta;
  }
}

export class PaginationInputDto implements IPaginationOptions {
  @ApiProperty({
    type: Number,
    default: 10,
    minimum: 1,
    maximum: MAX_COUNT_PAGE,
  })
  @IsNumber()
  @Min(1)
  @Max(MAX_COUNT_PAGE)
  readonly limit: number = 10;

  @ApiProperty({ type: Number, minimum: 1, default: 1 })
  @IsNumber()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({ type: String })
  @IsOptionalWithApi()
  @IsString()
  readonly sort?: string;

  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @IsOptionalWithApi()
  @IsIn(['ASC', 'DESC'])
  readonly order?: 'ASC' | 'DESC';
}

export class PaginationWithSearchInputDto implements IPaginationOptions {
  @ApiProperty({
    type: Number,
    default: 10,
    minimum: 1,
    maximum: MAX_COUNT_PAGE,
  })
  @IsNumber()
  @Min(1)
  @Max(MAX_COUNT_PAGE)
  readonly limit: number = 10;

  @ApiProperty({ type: Number, minimum: 1, default: 1 })
  @IsNumber()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({ type: String })
  @IsOptionalWithApi()
  @IsString()
  readonly sort?: string;

  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @IsOptionalWithApi()
  @IsIn(['ASC', 'DESC'])
  readonly order?: 'ASC' | 'DESC';

  @ApiProperty({ description: 'search' })
  @IsOptionalWithApi()
  search?: string;
}

export class PaginationMeta implements IPaginationMeta {
  @ApiProperty({ type: Number })
  itemCount: number;

  @ApiProperty({ type: Number })
  totalItems: number;

  @ApiProperty({ type: Number })
  itemsPerPage: number;

  @ApiProperty({ type: Number })
  totalPages: number;

  @ApiProperty({ type: Number })
  currentPage: number;
}

export function paginationResponse(
  data: [result: any[], total: number],
  page: number,
  limit: number,
) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    data: [...result],
    count: total,
    currentPage: page,
    nextPage: nextPage || 0,
    prevPage: prevPage || 0,
    lastPage: lastPage || page,
  };
}
