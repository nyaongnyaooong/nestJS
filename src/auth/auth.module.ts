import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register(jwtConfig)
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
