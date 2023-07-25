import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class ListRequestQuery {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  limit: string;
}

export class ListRequestBody {
  @IsOptional()
  @Length(0, 50, { message: 'Поле "Фамилия" должно быть длинной до 50 символов' })
  f: string;

  @IsOptional()
  @Length(0, 50, { message: 'Поле "Имя" должно быть длинной до 50 символов' })
  i: string;

  @IsOptional()
  @Length(0, 50, { message: 'Поле "Очество" должно быть длинной до 50 символов' })
  o: string;

  @IsOptional()
  @Length(0, 50, { message: 'Поле "Очество" должно быть длинной до 50 символов' })
  tax_status: string;

  @IsOptional()
  @Length(0, 10, { message: 'Поле "ИНН" должно быть длинной до 10 символов' })
  inn: string;

  @IsOptional()
  @Length(0, 15, {
    message: 'Поле "ОГРН/ОГРНИП" должно быть длинной до 15 символов',
  })
  ogrn: string;
}
