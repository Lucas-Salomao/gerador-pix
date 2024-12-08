import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'], // Domínios permitidos
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos HTTP permitidos
      allowedHeaders: 'Content-Type, Accept', // Cabeçalhos permitidos
    } as CorsOptions, // Adicione a tipagem para evitar erros
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Pousada Ypuã')
    .setDescription('Pousada Ypuã API description')
    .setVersion('1.0')
    .addTag('ypua')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  useContainer(app.select(AppModule),{fallbackOnErrors:true});
  app.enableCors();
  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
