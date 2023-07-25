import { Module } from '@nestjs/common';

import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { ContractsFilesModule } from './contracts_files/contracts_files.module';

@Module({
  imports: [
    PrismaModule,
    ContractsFilesModule,
    MulterModule.register(),
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
