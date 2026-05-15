import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  flightId: number;

  @IsNotEmpty()
  seat: string;
}
