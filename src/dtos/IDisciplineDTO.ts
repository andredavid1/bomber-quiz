export interface ICreateDisciplineDTO {
  name: string;
}

export interface IDisciplineDTO extends ICreateDisciplineDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
