import { Module } from '@nestjs/common';
import { UserModule } from 'src/common/user/user.module';

import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
