import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>
  ) { }

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  findAll() {
    return this.catRepository.find();
  }

  findOne(id: number) {
    return this.catRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const existCat = await this.catRepository.findOne({ where: { id } });
    if (!existCat) throw new Error('no Cat')
    console.log('put')
    Object.assign(existCat, updateCatDto)
    return await this.catRepository.save(existCat);
  }

  async remove(id: number) {
    return await this.catRepository.delete(id)
  }
}
