import * as env from 'dotenv';
env.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const isDevelopment = process.env.NODE_ENV === 'development';
const port = process.env.SERVER_PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/');
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    session({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      },
      secret: 'FJSJ4cJS1;',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
  if (isDevelopment) {
    app.enableCors({
      origin: ['*'],
    });
  }
  await app.listen(port);
}
bootstrap().then(() => console.log(`Listen port ${port}`));
