import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  exports: [TypeOrmModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
