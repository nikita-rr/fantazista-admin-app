import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Length,
} from 'class-validator';

export class UpdateRequest {
  @IsNotEmpty({ message: 'Некоректный идентификатор записи' })
  @Length(36, 36, { message: 'Некоректный идентификатор записи' })
  id: string;

  @IsNotEmpty({ message: 'Поле "Номер договора" обязательно для заполнения' })
  @Length(0, 50, { message: 'Поле "Номер договора" должно быть длинной до 50 символов' })
  number: string;

  @IsNotEmpty({ message: 'Поле "Дата" обязательно для заполнения' })
  @IsDateString({}, { message: 'Некоректная дата' })
  date: Date;

  @IsNotEmpty({ message: 'Поле "Сумма договора" обязательно для заполнения' })
  @Transform(({ value, obj }) => (obj.summ = Number(value)))
  @IsPositive({ message: 'Сумма договора не должна быть муньше' })
  summ: number;

  @IsOptional()
  @Length(0, 50, {
    message: 'Поле "Юридическое лицо клиента" должно быть длинной 25 символов',
  })
  legal_entity: string;

  @IsOptional()
  @Length(0, 50, { message: 'Поле "Бренд клиента" должно быть длинной до 50 символов' })
  client_brand: string;

  @IsNotEmpty({ message: 'Некоректный идентификатор клиента' })
  @Length(36, 36, { message: 'Некоректный идентификатор клиента' })
  clientId: string;
}
