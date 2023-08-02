import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
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

        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });
      // return the newly created user
      return user;
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
    // return the user
    delete user.hashedPassword;
    return user;
  }
}
