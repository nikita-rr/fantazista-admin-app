import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';

import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
