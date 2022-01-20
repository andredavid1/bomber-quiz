export interface ICreateUserDTO {
  name: string;
  rg: number;
  email: string;
  avatarUrl: string;
  password: string;
  level: "admin" | "partner" | "customer";
  registered: boolean;
  expiresRegister: Date;
}

export interface IUserDTO extends ICreateUserDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
