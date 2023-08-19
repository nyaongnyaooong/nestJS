import { EntityRepository, Repository } from "typeorm";
import { Board } from "./entity/board.entity";

@EntityRepository
export class BoardRepository extends Repository<Board> {
  
}