import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BoardEntity } from "src/boards/entity/board.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1458369',
  database: 'board-app',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [BoardEntity],

  // synchronize: true 옵션은 entity 생성 후 자동으로 테이블을 만들어주는 옵션으로 개발 모드에서만 사용할 것
  synchronize: true
}