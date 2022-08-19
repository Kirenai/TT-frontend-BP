import { CustomerModel } from "./customer.model";

export interface AccountModel {
  accountId?: number;
  accountNumber?: string;
  accountType?: string;
  initialBalance?: number;
  state?: string;
  customer?: CustomerModel;
}