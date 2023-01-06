import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3000;
  
  await app.listen(PORT);

  console.log(`corriendo en el puerto ${PORT}`);
  
}
bootstrap();
