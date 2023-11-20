import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5002;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Send CVs')
    .setDescription('Documentation about API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(PORT, () => console.log(`Started on port ${PORT}`));
}
bootstrap();
