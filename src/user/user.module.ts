import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
