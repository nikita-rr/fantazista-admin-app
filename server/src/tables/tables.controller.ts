import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/auth/guards/user.guard';
import { CreateRequest } from './requests/create.request';
import { UpdateRequest } from './requests/update.request';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ListRequestQuery, ListRequestBody } from './requests/list.request';

@Controller('tables')
export class TablesController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(new UserGuard())
  @Post('')
  list(@Query() query: ListRequestQuery, @Body() body: ListRequestBody) {
    return this.prisma.table.findMany({
      where: {
        type: {
          contains: body.type,
          mode: 'insensitive',
        },
        lat: body.lat,
        lon: body.lon,
        contractId: body.contractsIds?.length ? { in: body.contractsIds } : undefined,
      },
      skip: Number(query.page) * Number(query.limit),
      take: Number(query.limit),
      include: { contract: { include: { client: true } } },
      orderBy: { created_at: 'desc' },
    });
  }

  @UseGuards(new UserGuard())
  @Get('detail/:id')
  detail(@Param() { id }: { id: string }) {
    return this.prisma.table.findFirst({
      where: { id },
      include: {
        contract: {
          include: { client: true },
        },
      },
    });
  }

  @UseGuards(new UserGuard())
  @Post('create')
  create(@Session() session, @Body() body: CreateRequest) {
    return this.prisma.table.create({
      data: {
        type: body.type,
        lat: body.lat,
        lon: body.lon,
        contract: {
          connect: { id: body.contractId },
        },
        creator: {
          connect: { id: session.user.id },
        },
      },
    });
  }

  @UseGuards(new UserGuard())
  @Post('update')
  update(@Body() body: UpdateRequest) {
    return this.prisma.table.update({
      where: { id: body.id },
      data: {
        type: body.type,
        lat: body.lat,
        lon: body.lon,
        contract: {
          connect: { id: body.contractId },
        },
      },
    });
  }

  @UseGuards(new UserGuard())
  @Get('delete/:id')
  delete(@Param() { id }: { id: string }) {
    return this.prisma.table.delete({ where: { id } });
  }
}
