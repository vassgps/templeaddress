import { IsNotEmpty, IsEmail,MinLength, IsString, IsOptional } from 'class-validator';

export class CreateTempleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  town: string;

  @IsNotEmpty()
  deity: string[];

  @IsNotEmpty()
  personal_number: string;

  @IsNotEmpty()
  google_map_link:string

  @IsNotEmpty()
  description:string

  @IsNotEmpty()
  contact_number:string

  @IsNotEmpty()
  thumbnail_image:string
}
