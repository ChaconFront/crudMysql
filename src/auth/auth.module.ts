import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt,constant';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      global: true,// nos dice que cualquier servicio puede utilizar el jwt.
      secret: jwtConstants.secret,//palabra secreta para hacer la comparacion.
      signOptions: { expiresIn: '1d' },//expiracion del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
