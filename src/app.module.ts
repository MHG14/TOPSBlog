import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { CommentModule } from './comment/comment.module';
import { LoggerModule } from 'nestjs-pino';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 60000,
      isGlobal: true
    }),
    LoggerModule.forRoot(),
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    CommentModule,
  ],
})
export class AppModule {}
