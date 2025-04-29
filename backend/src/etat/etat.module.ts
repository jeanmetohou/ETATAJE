import { Module } from '@nestjs/common';
import { EtatService } from './etat.service';
import { EtatController } from './etat.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  controllers: [EtatController],
  providers: [EtatService, UsersService],
  exports: [EtatService, UsersService],
})
export class EtatModule {}
