import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EtatService } from './etat.service';
import { CreateEtatDto } from './dto/create-etat.dto';
import { UpdateEtatDto } from './dto/update-etat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('etat')
@Controller('etat')
export class EtatController {
  constructor(private readonly etatService: EtatService) {}

  @Post()
  create(@Body() createEtatDto: CreateEtatDto) {
    return this.etatService.create(createEtatDto);
  }

  @Get()
  findAll() {
    return this.etatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtatDto: UpdateEtatDto) {
    return this.etatService.update(id, updateEtatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etatService.remove(id);
  }
}
