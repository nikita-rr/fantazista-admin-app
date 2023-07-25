import { Module } from '@nestjs/common';
import { UserModule } from 'src/common/user/user.module';

import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
