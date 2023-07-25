import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/auth/guards/user.guard';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ContractsFilesService } from './contracts_files.service';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Controller('contracts/files')
export class ContractsFilesController {
  constructor(
    private prisma: PrismaService,
    private contractsFilesService: ContractsFilesService,
  ) {}

  @UseGuards(new UserGuard())
  @Get('download/:id')
  async download(@Param() { id }: { id: string }, @Res() response) {
    const file = await this.prisma.contractFile.findUnique({ where: { id } });
    if (file && file.id) {

      const filePath = join(file.target_path);
      const stat = statSync(filePath);

      response.writeHead(200, {
        'Content-Type': file.mimetype,
        'Content-Length': stat.size,
      });

      const readStream = createReadStream(filePath);
      readStream.pipe(response);

    } else throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
  }

  @UseGuards(new UserGuard())
  @Get('delete/:id')
  async delete(@Param() { id }: { id: string }) {
    const file = await this.prisma.contractFile.findUnique({ where: { id } });
    if (file && file.id) {
      this.contractsFilesService.unlinkFile(file);
      return this.prisma.contractFile.delete({ where: { id } });
    } else throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
  }
}
