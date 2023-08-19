import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.models';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) { }
  private boards: Board[] = [];


  getAllBoards(): Promise<BoardEntity[]> {
    return this.boardsRepository.find();
  }

  findOne(id: number): Promise<BoardEntity> {
    return this.boardsRepository.findOne();
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    }

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((e) => e.id === id)

    if (!found) throw new NotFoundException();
    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id)

    this.boards = this.boards.filter(e => e.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
