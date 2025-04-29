import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEtatDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  tribunalChambres: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  numeroDossier: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nomEtQualiteDesPartiesConseil: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  objet: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  faitsEtProcedure: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  moyensDesParties: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observations: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  updatedAt: string;
}
