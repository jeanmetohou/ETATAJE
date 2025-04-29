import { PartialType } from '@nestjs/mapped-types';
import { CreateEtatDto } from './create-etat.dto';

export class UpdateEtatDto extends PartialType(CreateEtatDto) {}
