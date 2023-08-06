import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: SignupDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);
    // save the user to the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      // return the token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
    }
  }

  async login(dto: LoginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }
    // compare passwords
    const passwordsMatch = await argon.verify(
      user.hashedPassword,
      dto.password,
    );
    // if password is incorrect throw exception
    if (!passwordsMatch) {
      throw new ForbiddenException('credentials incorrect');
    }
    // return the token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get<string>('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '900m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
