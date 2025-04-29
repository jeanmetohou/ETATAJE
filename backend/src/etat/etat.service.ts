import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEtatDto } from './dto/create-etat.dto';
import { UpdateEtatDto } from './dto/update-etat.dto';

@Injectable()
export class EtatService {
  constructor(private prismaService: PrismaService) {}

  eData = (dto: Partial<CreateEtatDto> | Partial<UpdateEtatDto>) => {
    const {
      tribunalChambres,
      numeroDossier,
      nomEtQualiteDesPartiesConseil,
      objet,
      faitsEtProcedure,
      moyensDesParties,
      observations,
    } = dto;

    return {
      ...(tribunalChambres && { tribunalChambres }),
      ...(numeroDossier && { numeroDossier }),
      ...(nomEtQualiteDesPartiesConseil && { nomEtQualiteDesPartiesConseil }),
      ...(objet && { objet }),
      ...(faitsEtProcedure && { faitsEtProcedure }),
      ...(moyensDesParties && { moyensDesParties }),
      ...(observations && { observations }),
    };
  };

  async create(createEtatDto: CreateEtatDto) {
    try {
      await this.prismaService.etat.create({
        data: this.eData(createEtatDto),
      });

      return { message: 'Etat created successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const etat = await this.prismaService.etat.findMany({});
      if (etat.length == 0) return { data: [], message: 'No record founded' };
      return etat;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const etat = await this.prismaService.etat.findFirstOrThrow({
        where: { etatId: id },
      });
      return etat;
    } catch (error) {
      throw new NotFoundException(`Dossier with ID ${id} not found`);
    }
  }

  async update(id: string, updateEtatDto: UpdateEtatDto) {
    try {
      await this.prismaService.etat.update({
        where: { etatId: id },
        data: this.eData(updateEtatDto),
      });
      return { message: 'Dossier updated successfully' };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update dossier: ' + error.message,
      );
    }
  }

  async remove(id: string) {
    try {
      const etat = await this.prismaService.etat.delete({
        where: { etatId: id },
      });
      return { data: etat, message: 'Dossier deleted successfully ' };
    } catch (error) {
      throw new NotFoundException(`Message: Dossier with ID ${id} not found`);
    }
  }
}
