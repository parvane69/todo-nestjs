import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export const IsOptionalWithApi = (apiPropertyOptional?: ApiPropertyOptions) => {
  return applyDecorators(
    IsOptional(),
    ApiPropertyOptional(apiPropertyOptional),
  );
};
