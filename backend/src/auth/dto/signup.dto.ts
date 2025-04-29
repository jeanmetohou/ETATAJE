import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class SignupDto {
  @IsString()
  @IsNotEmpty()
  readonly fullname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly isAdmin: string;
}
