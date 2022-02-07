export interface IQuizQuestion {
  order: number;
  id: string;
  correct: boolean;
  answered: string;
}

export interface ICreateQuizDTO {
  userId: string;
  questions: IQuizQuestion[];
  average: number;
  finished: boolean;
}

export interface IQuizDTO extends ICreateQuizDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
