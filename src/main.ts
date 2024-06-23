import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
//import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: '*', //'http://localhost:3002' // ya front ,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  });
  const config = new DocumentBuilder()
    .setTitle('Todo Api')
    .setDescription('The Todo description')
    .setExternalDoc('OpenAPI Json Schema', '/api/docs-json')
    .addServer('http://localhost:3002/', 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      syntaxHighlight: {
        theme: 'monokai',
      },
    },
  });
  await app.listen(3002);
}
bootstrap();
