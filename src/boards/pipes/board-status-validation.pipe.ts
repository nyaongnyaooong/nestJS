import { ArgumentMetadata, PipeTransform, BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../boards.models";

// 사용자 정의 파이프
export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC,
  ]

  // 유효성 검사 함수
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);

    // 조건식에 맞으면 true 틀리면 false return
    return index !== -1;
  }

  // value : 요청한 값
  // metadata : 요청 값에 대한 객체형태의 정보
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if(!this.isStatusValid(value)) {
      throw new BadRequestException('not valid option');
    }

    return value
  } 
}