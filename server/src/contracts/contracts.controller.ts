import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserGuard } from 'src/auth/guards/user.guard';
import { CreateRequest } from './requests/create.request';
import { UpdateRequest } from './requests/update.request';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ListRequestQuery, ListRequestBody } from './requests/list.request';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ContractsFilesService } from './contracts_files/contracts_files.service';
import { extname } from 'path';

@Controller('contracts')
export class ContractsController {
  constructor(
    private prisma: PrismaService,
    private fileService: ContractsFilesService,
  ) {}

  @UseGuards(new UserGuard())
  @Post('')
  list(@Query() query: ListRequestQuery, @Body() body: ListRequestBody) {
    return this.prisma.contract.findMany({
      where: {
        number: {
          contains: body.number,
          mode: 'insensitive',
        },
        date: {
          gte: body.summ_start ? new Date(body.summ_start).toISOString() : undefined,
          lte: body.summ_end ? new Date(body.summ_end).toISOString() : undefined,
        },
        client_brand: {
          contains: body.client_brand,
          mode: 'insensitive',
        },
        summ: {
          gte: body.summ_start,
          lte: body.summ_end,
        },
        legal_entity: {
          contains: body.legal_entity,
          mode: 'insensitive',
        },
        clientId: body.clientsIds?.length ? { in: body.clientsIds } : undefined,
      },
      skip: Number(query.page) * Number(query.limit),
      take: Number(query.limit),
      orderBy: { created_at: 'desc' },
      include: { client: true },
    });
  }

  @UseGuards(new UserGuard())
  @Get('detail/:id')
  detail(@Param() { id }: { id: string }) {
    return this.prisma.contract.findFirst({
      where: { id },
      include: { client: true, files: true },
    });
  }

  @UseGuards(new UserGuard())
  @Post('create')
  @UseInterceptors(FilesInterceptor('_files'))
  create(
    @Session() session,
    @UploadedFiles() _files: Express.Multer.File[],
    @Body() body: CreateRequest,
  ) {
    return this.prisma.contract.create({
      data: {
        client: {
          connect: { id: body.clientId },
        },
        number: body.number,
        date: body.date,
        client_brand: body.client_brand,
        summ: body.summ,
        legal_entity: body.legal_entity,
        creator: {
          connect: { id: session.user.id },
        },
        files: {
          createMany: {
            data: _files.map((file) => ({
              target_path: this.fileService.saveFile(file),
              size: file.size,
              extension: extname(file.originalname),
              original_name: file.originalname,
              mimetype: file.mimetype,
            })),
          },
        },
      },
    });
  }

  @UseGuards(new UserGuard())
  @Post('update')
  @UseInterceptors(FilesInterceptor('_files'))
  update(@UploadedFiles() _files: Express.Multer.File[], @Body() body: UpdateRequest) {
    return this.prisma.contract.update({
      where: { id: body.id },
      data: {
        client: {
          connect: { id: body.clientId },
        },
        number: body.number,
        date: body.date,
        client_brand: body.client_brand,
        summ: body.summ,
        legal_entity: body.legal_entity,
        files: {
          createMany: {
            data: _files.map((file) => ({
              target_path: this.fileService.saveFile(file),
              size: file.size,
              extension: extname(file.originalname),
              original_name: file.originalname,
              mimetype: file.mimetype,
            })),
          },
        },
      },
    });
  }

  @UseGuards(new UserGuard())
  @Get('delete/:id')
  delete(@Param() { id }: { id: string }) {
    return this.prisma.contract.delete({ where: { id } });
  }
}
