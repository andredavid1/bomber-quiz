export interface ICreateAnswerDTO {
  value: string;
  correct: boolean;
}

export interface IAnswerDTO extends ICreateAnswerDTO {
  _id: string;
}
