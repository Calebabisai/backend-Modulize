import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ACTIVAR CORS (Vital para que Angular se conecte)
  app.enableCors();

  // ACTIVAR VALIDACIONES GLOBALES (Para que funcionen DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina datos extra que no estén en el DTO
      forbidNonWhitelisted: true, // Tira error si mandan datos basura
      transform: true, // Convierte los tipos de datos automáticamente (ej. string '1' a number 1)
    }),
  );

  // DOCUMENTACIÓN SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Turing Inventory API')
    .setDescription('API para gestión de activos - Reto Técnico')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // La documentación estará en /docs

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
