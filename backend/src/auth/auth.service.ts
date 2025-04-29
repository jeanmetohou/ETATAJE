import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async signup(signupDto: SignupDto) {
    const { fullname, email, password } = signupDto;
    const user = await this.findUserByEmail(email);
    if (user) throw new ConflictException('User already exists');
    const hash = await bcrypt.hash(password, 10);
    await this.prismaService.user.create({
      data: { fullname, email, password: hash },
    });
    return { message: 'User created successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Password does not match');
    const payload = { sub: user.userId, fullName: user.fullname };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET_TOKEN'),
      // expiresIn: '1m',
    });
    await this.prismaService.user.update({
      where: { userId: user.userId },
      data: { token: token },
    });
    return {
      token,
      user: {
        fullName: user.fullname,
        email: user.email,
        userId: user.userId,
      },
    };
  }

  async logout(logoutDto: LogoutDto) {
    try {
      const { token } = logoutDto; // Extraire le token du DTO

      // Vérifier et déchiffrer le token avec la clé secrète
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('SECRET_TOKEN'),
      });

      // Récupérer l'`userId` à partir du token déchiffré
      const userId = decoded.sub || decoded.userId; // Assurez-vous que le token contient le userId

      if (!userId) {
        throw new BadRequestException('Le userId est manquant dans le token.');
      }

      // Comparer le token reçu avec celui de la base de données pour cet utilisateur
      const user = await this.prismaService.user.findUnique({
        where: { userId: userId },
      });

      if (user.token !== token) {
        throw new UnauthorizedException('Token invalide.');
      }

      // Si les tokens correspondent, supprimer le token dans la base de données
      await this.prismaService.user.update({
        where: { userId: userId },
        data: { token: null },
      });

      return { message: 'Déconnexion réussie.' };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expiré.');
      }
      throw new BadRequestException(error.message);
    }
  }
}
