import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  //Documentar tu api
  const config = new DocumentBuilder()
  .setTitle("Cats example")//titulo de la documentacion
  .setDescription("The cats API description")//descripcion
  .setVersion("1.0")//version correspondiente
  .addBearerAuth()//autorizacion para acceder a estas rutas
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("docs", app, document);






  await app.listen(3000);
}
bootstrap();

