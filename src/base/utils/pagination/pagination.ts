import {
  PaginateOutput,
  PaginationInputDto,
  PaginationMeta,
} from './pagination.dto';
import { SelectQueryBuilder } from 'typeorm';

export const paginate = async <Entity>(
  queryBuilder: SelectQueryBuilder<any>,
  dto: PaginationInputDto,
  alias?: string,
): Promise<PaginateOutput<Entity>> => {
  const { limit = 10, page = 1, sort, order = 'ASC' } = dto;
  const skip = (page - 1) * limit;

  const clonedQuery = await queryBuilder.clone();

  sort && alias && clonedQuery.orderBy(`${alias}.${sort}`, order);

  const [items = [], total = 0] = await clonedQuery
    .take(limit)
    .skip(skip)
    .getManyAndCount();
  const meta = {
    itemCount: items.length,
    totalItems: total,
    itemsPerPage: limit,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };

  return { items, meta };
};

export const proPaginate = async <PaginationDto, OutPutDto>(
  items: any,
  pagination: PaginationInputDto,
  dtoConstructor: new (
    items: OutPutDto,
    paginationMeta: PaginationMeta,
  ) => PaginationDto,
): Promise<PaginationDto> => {
  const { limit, page } = pagination;

  const totalPages = items[0]?.totalCount
    ? Math.ceil(items[0]?.totalCount / limit)
    : 1;

  const paginationInfo: PaginationMeta = {
    totalPages: totalPages,
    totalItems: items[0]?.totalCount ? items[0]?.totalCount : 0,
    itemsPerPage: limit,
    itemCount: items.length,
    currentPage: page,
  };

  return new dtoConstructor(items, paginationInfo);
};
