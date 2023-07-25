import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateRequest {

  @IsOptional()
  @Length(0, 50, { message: 'Поле "Тип" должно быть длинной до 50 символов' })
  type?: string;

  @IsNotEmpty({message: 'Поле "Ширина" обязательно для заполнения'})
  lat: number;

  @IsNotEmpty({message: 'Поле "Долгота" обязательно для заполнения'})
  lon: number;

  @IsNotEmpty({ message: 'Некоректный идентификатор договора' })
  @Length(36, 36, { message: 'Некоректный идентификатор договора' })
  contractId: string;

}
