import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePersonaDto {
  @IsNotEmpty({ message: 'El CI es obligatorio' })
  @IsString({ message: 'El CI debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El CI no puede tener más de 20 caracteres' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly ci: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly nombres: string;

  @IsNotEmpty({ message: 'El primer apellido es obligatorio' })
  @IsString({ message: 'Debe ser una cadena de texto' })
  @MaxLength(50, {
    message: 'El primer apellido no puede tener más de 50 caracteres',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly primer_apellido: string;

  @IsNotEmpty({ message: 'El segundo apellido es obligatorio' })
  @IsString({ message: 'Debe ser una cadena de texto' })
  @MaxLength(50, {
    message: 'El segundo apellido no puede tener más de 50 caracteres',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly segundo_apellido: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsString({ message: 'La fecha debe ser una cadena de texto (YYYY-MM-DD)' })
  readonly fecha_nacimiento: string;
}
