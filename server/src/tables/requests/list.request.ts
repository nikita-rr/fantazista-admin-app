import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ListRequestQuery {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  limit: string;
}

export class ListRequestBody {
  @IsOptional()
  @Length(0, 25, { message: 'Поле "Тип" должно быть длинной до 50 символов' })
  type: string;

  @IsOptional()
  lat: number;

  @IsOptional()
  lon: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contractsIds?: string[];
}
