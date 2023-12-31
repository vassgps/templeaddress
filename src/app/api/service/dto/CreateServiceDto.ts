import { IsNotEmpty, IsEmail,MinLength, IsString, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  service: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  address:string

  @IsNotEmpty()
  service_areas:string

  @IsNotEmpty()
  consulting_time:string

  @IsNotEmpty()
  booking_available:string

  @IsNotEmpty()
  contact_number:string

  @IsNotEmpty()
  image:string
}
