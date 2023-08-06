import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser, Roles } from '../auth/decorator';
import { Role } from '../auth/enum/roles.enum';
import { JwtGuard } from '../auth/guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // @Get('me')
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  // getMe(@GetUser() user: User) {
  //   return user;
  // }
}
