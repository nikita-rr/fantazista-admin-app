import { Module } from '@nestjs/common';
import { UserModule } from 'src/common/user/user.module';

import { ContractsFilesController } from './contracts_files.controller';
import { ContractsFilesService } from './contracts_files.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [ContractsFilesController],
  providers: [ContractsFilesService],
  exports: [ContractsFilesService],
})
export class ContractsFilesModule {}
