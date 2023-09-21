// gkc_hash_code : 01GYS4MFBRHRYQ4ENZEFBHPDA0
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configSwagger(app: INestApplication) {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Ecom Store')
    .setDescription('The Ecom Store API description')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('swagger', app, document);
}
