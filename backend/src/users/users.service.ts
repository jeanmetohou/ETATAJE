import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { fullname, email, password } = createUserDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) throw new ConflictException('User already exists');

    const hash = await bcrypt.hash(password, 10);

    try {
      await this.prismaService.user.create({
        data: {
          fullname,
          email,
          password: hash,
        },
      });
      return { message: 'User created successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany({});
      if (users.length === 0) {
        return { data: [], message: 'No users found' };
      }
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: { userId: id },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { fullname, email, password } = updateUserDto;

    let hash: string | undefined;
    if (password) {
      hash = await bcrypt.hash(password, 10);
    }
    console.log('Update DTO:', updateUserDto);
    try {
      await this.prismaService.user.update({
        where: { userId: id },
        data: {
          fullname,
          email,
          ...(password && { password: hash }), // Inclure le mot de passe seulement s'il est défini
        },
      });
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prismaService.user.delete({
        where: { userId: id },
      });
      return { data: user, message: 'User deleted successfully ' };
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
