import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';
import { SreoModule } from './presentation/modules/sreo.module';

async function bootstrap() {
  const app = await NestFactory.create(SreoModule);

  // Configurar Morgan para logging de requests con formato 'tiny'
  app.use(morgan('tiny'));

  // Habilitar CORS para permitir solicitudes desde cualquier origen
  app.enableCors({
    origin: true, // Permite cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('SREO API')
    .setDescription('API para Sistema de Reservas de Espacios de Oficina')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
