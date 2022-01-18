export interface IUserCreateDTO {
  name: string;
  rg: string;
  email: string;
  password: string;
  level: "admin" | "partner" | "customer";
  registered: boolean;
  expiresRegister: Date;
}

export interface IUserDTO extends IUserCreateDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
