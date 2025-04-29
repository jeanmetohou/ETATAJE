import { IsEmail, IsEnum, IsString, IsInt, IsOptional } from 'class-validator';

enum UserRole {
  Admin,
  Demandeur,
  Conducteur,
  ChefParc,
  ChefService,
  ChefDivision,
}

enum DriverStatus {
  Disponible,
  EnCourse,
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  readonly email?: string; // Ajout du "?" pour rendre optionnel

  @IsOptional()
  @IsString()
  readonly fullname?: string;

  @IsOptional()
  @IsString()
  readonly directionId?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'test' })
  readonly role?: any;

  @IsOptional()
  token?: string;

  @IsOptional()
  @IsInt()
  readonly phoneNumber?: number;

  @IsOptional()
  @IsEnum(DriverStatus, { message: 'Statut invalide' })
  readonly driverStatus?: any;
}
