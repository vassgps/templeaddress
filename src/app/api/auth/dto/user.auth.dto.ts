import { IsNotEmpty, IsEmail,MinLength, IsString, IsOptional } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsString()
  @IsOptional() 
  referrer_id?: string;
  

  @IsString()
  @IsNotEmpty()
  phone_number:string

}



export class LoginUserDto {
  
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @MinLength(5)
    password: string;

  }


  export class ResetPasswordDto {
  
    @IsNotEmpty()
    @MinLength(5)
    reset_password: string;
  
    @IsNotEmpty()
    @MinLength(5)
    password: string;

  }