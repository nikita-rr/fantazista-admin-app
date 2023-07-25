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

@Controller('clients')
export class ClientsController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(new UserGuard())
  @Post('')
  list(@Query() query: ListRequestQuery, @Body() body: ListRequestBody) {
    return this.prisma.client.findMany({
      where: {
        f: {
          contains: body.f,
          mode: 'insensitive',
        },
        i: {
          contains: body.i,
          mode: 'insensitive',
        },
        o: {
          contains: body.o,
          mode: 'insensitive',
        },
        inn: {
          contains: body.inn,
          mode: 'insensitive',
        },
        ogrn: {
          contains: body.ogrn,
          mode: 'insensitive',
        },
        tax_status: {
          contains: body.tax_status,
          mode: 'insensitive',
        },
      },
      skip: Number(query.page) * Number(query.limit),
      take: Number(query.limit),
      orderBy: { created_at: 'desc' },
    });
  }

  @UseGuards(new UserGuard())
  @Get('detail/:id')
  detail(@Param() { id }: { id: string }) {
    return this.prisma.client.findFirst({ where: { id } });
  }

  @UseGuards(new UserGuard())
  @Post('create')
  create(@Session() session, @Body() body: CreateRequest) {
    return this.prisma.client.create({
      data: {
        f: body.f,
        i: body.i,
        o: body.o,
        inn: body.inn,
        ogrn: body.ogrn,
        tax_status: body.tax_status,
        creator: {
          connect: { id: session.user.id },
        },
      },
    });
  }

  @UseGuards(new UserGuard())
  @Post('update')
  update(@Body() body: UpdateRequest) {
    return this.prisma.client.update({
      where: { id: body.id },
      data: {
        f: body.f,
        i: body.i,
        o: body.o,
        inn: body.inn,
        ogrn: body.ogrn,
        tax_status: body.tax_status,
      },
    });
  }

  @UseGuards(new UserGuard())
  @Get('delete/:id')
  delete(@Param() { id }: { id: string }) {
    return this.prisma.client.delete({ where: { id } });
  }
}
