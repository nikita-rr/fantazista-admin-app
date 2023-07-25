import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class ListRequestQuery {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  limit: string;
}

export class ListRequestBody {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  clientsIds?: string[];

  @IsOptional()
  @Length(1, 25, { message: 'Поле "Номер договора" должно быть длинной до 50 символов' })
  number?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Некоректная дата' })
  date_start?: Date;

  @IsOptional()
  @IsDateString({}, { message: 'Некоректная дата' })
  date_end?: Date;

  @IsOptional()
  @IsPositive({ message: 'Сума договора должна быть больше нуля' })
  summ_start?: number;

  @IsOptional()
  @IsPositive({ message: 'Сума договора должна быть больше нуля' })
  summ_end?: number;

  @IsOptional()
  @Length(1, 25, {
    message: 'Поле "Юридическое лицо клиента" должно быть длинной 25 символов',
  })
  legal_entity?: string;

  @IsOptional()
  @Length(1, 25, { message: 'Поле "Бренд клиента" должно быть длинной до 50 символов' })
  client_brand?: string;

}
