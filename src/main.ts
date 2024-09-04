import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");//nos establece un prefijo para cada ruta.

  app.useGlobalPipes(//le estamos diciendo que de forma global haga las validaciones de los datos de entrada
    new ValidationPipe({
      whitelist: true,//para admitir los dto.
      forbidNonWhitelisted: true,//le va a tirar un error al cliente si es que intenta mandar otra cosa
      transform: true,// te permite hacer el parceo de los datos que recibe el controlador
    })
  )


  await app.listen(3000);
}
bootstrap();

