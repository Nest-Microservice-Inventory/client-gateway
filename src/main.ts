import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {

  const logger = new Logger("API Gateway");

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');


  app.enableCors();


  app.useGlobalFilters(
    new RpcCustomExceptionFilter()
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )


  await app.listen(envs.port);

  logger.log(`API Gateway is running on port: ${envs.port}`);

}
bootstrap();
