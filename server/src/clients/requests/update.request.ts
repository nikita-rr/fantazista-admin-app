import { IsNotEmpty, Length } from 'class-validator';

export class UpdateRequest {
  @IsNotEmpty({ message: 'Некоректный идентификатор записи' })
  @Length(36, 36, { message: 'Некоректный идентификатор записи' })
  id: string;

  @IsNotEmpty({ message: 'Поле "Фамилия" обязательно для заполнения' })
  @Length(3, 25, { message: 'Поле "Фамилия" должно быть длинной от 3 до 50 символов' })
  f: string;

  @IsNotEmpty({ message: 'Поле "Имя" обязательно для заполнения' })
  @Length(3, 25, { message: 'Поле "Имя" должно быть длинной от 3 до 50 символов' })
  i: string;

  @IsNotEmpty({ message: 'Поле "Очество" обязательно для заполнения' })
  @Length(3, 25, { message: 'Поле "Очество" должно быть длинной от 3 до 50 символов' })
  o: string;

  @IsNotEmpty({ message: 'Поле "Налоговый статус" обязательно для заполнения' })
  tax_status: string;

  @IsNotEmpty({ message: 'Поле "ИНН" обязательно для заполнения' })
  @Length(10, 10, { message: 'Поле "ИНН" должно быть длинной 10 символов' })
  inn: string;

  @IsNotEmpty({ message: 'Поле "ОГРН/ОГРНИП" обязательно для заполнения' })
  @Length(13, 15, {
    message: 'Поле "ОГРН/ОГРНИП" должно быть длинной от 13 до 15 символов',
  })
  ogrn: string;
}
