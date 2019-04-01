import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
     new FastifyAdapter(),
  );
  console.log(join(__dirname, '..', 'public'))
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  });
 // app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(3000);
}
bootstrap();
