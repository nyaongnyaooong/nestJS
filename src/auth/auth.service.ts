import { HttpException, HttpStatus, Injectable, Options, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { UserEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async registerUser(newUser: UserDto): Promise<UserDto> {
    let userFind: UserDto = await this.userService.findByFields({
      where: { username: newUser.username }
    });

    if (userFind) throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST)

    return await this.userService.save(newUser)
  }

  async validateUser(userDto: UserDto): Promise<{ accessToken: string } | undefined> {
    let userFind: UserEntity = await this.userService.findByFields({
      where: { username: userDto.username }
    });

    const validatePassword = await bcrypt.compare(userDto.password, userFind.password);

    if (!userFind || !validatePassword) throw new UnauthorizedException();

    const payload: Payload = {
      id: userFind.id,
      username: userFind.username
    }

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  async tokenValidateUser(payload: Payload): Promise<UserDto | undefined> {
    return await this.userService.findByFields({
      where: { id: payload.id }
    });
  }
}
