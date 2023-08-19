import { HttpException, HttpStatus, Injectable, Options, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ) { }

  async registerUser(newUser: UserDto): Promise<UserDto> {
    let userFind: UserDto = await this.userService.findByFields({
      where: { username: newUser.username }
    });

    if (userFind) throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST)

    return await this.userService.save(newUser)
  }

  async validateUser(userDto: UserDto): Promise<string | undefined> {
    let userFind: UserDto = await this.userService.findByFields({
      where: { username: userDto.username }
    });

    const validatePassword = await bcrypt.compare(userDto.password, userFind.password)

    if (!userFind || !validatePassword) throw new UnauthorizedException();

    return 'login success';
  }
}
