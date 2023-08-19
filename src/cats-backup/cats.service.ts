import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Cat } from './entity/cats.entity';
// import { Cat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) { }
  // private readonly cats: Cat[] = [];

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne({ where: { id } });
  }

  async create(cat: Cat): Promise<void> {
    await this.catsRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async update(id: number, cat: Cat) {
    const existedCat = await this.findOne(id);
    if (!existedCat) throw new Error('cat not found!');

    Object.assign(existedCat, cat);
    return await this.catsRepository.save(existedCat);
  }

}
