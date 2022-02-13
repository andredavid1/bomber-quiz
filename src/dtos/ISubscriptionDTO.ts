import { IUserDTO } from "./IUserDTO";

export interface ICreateSubscriptionDTO {
  user: IUserDTO;
  plan: "quarterly" | "semiannual" | "yearly";
  condition: "normalSale" | "discountSale" | "courtesy";
  discount?: { type: Number; default: 0 };
  amount?: { type: Number; default: 0 };
}

export interface ISubscriptionDTO extends ICreateSubscriptionDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
