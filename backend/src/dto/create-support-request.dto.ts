import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSupportRequestDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MaxLength(120)
  subject!: string;

  @IsNotEmpty()
  @MaxLength(1000)
  message!: string;
}
