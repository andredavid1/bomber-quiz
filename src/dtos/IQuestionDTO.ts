import { IAnswerDTO } from "./IAnswerDTO";
import { IDisciplineDTO } from "./IDisciplineDTO";

export interface ICreateQuestionDTO {
  discipline: IDisciplineDTO;
  statement: string;
  difficult: "veryEasy" | "easy" | "medium" | "hard" | "veryHard";
  answers: IAnswerDTO[];
}

export interface IQuestionDTO extends ICreateQuestionDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
