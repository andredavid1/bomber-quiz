import { IQuestionDTO } from "./IQuestionDTO";

export interface IQuizQuestion {
  levelQuestion: string;
  questionRight: boolean;
  selectedAnswerOption: string;
}

export interface ICreateQuizDTO {
  userId: string;
  questions: IQuestionDTO[];
  complementQuestionsQuiz: IQuizQuestion[];
  average: number;
  finished: boolean;
}

export interface IQuizDTO extends ICreateQuizDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
