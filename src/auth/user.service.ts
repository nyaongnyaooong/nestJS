import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async findByFields(option: FindOneOptions<UserDto>): Promise<UserDto | undefined> {
    return await this.userRepository.findOne(option);
  }

  async save(userDto: UserDto): Promise<UserDto | undefined> {
    const result = await this.transformPassword(userDto);
    console.log(result)
    // console.log(userDto)

    return await this.userRepository.save(userDto)
  }

  async transformPassword(user: UserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);

    // return Promise.resolve();
  }

}
