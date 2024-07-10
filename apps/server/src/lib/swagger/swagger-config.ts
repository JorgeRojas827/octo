import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfigGenerator = (app: NestExpressApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Octo API')
    .setDescription('The awesome Octo API docs!')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
};
