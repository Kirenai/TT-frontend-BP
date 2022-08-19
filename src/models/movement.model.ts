import { AccountModel } from "./account.mode";
import { CustomerModel } from "./customer.model";

export interface MovementModel {
  movementId?: number;
  date?: string;
  movementType?: string;
  value?: number;
  balance?: number;
  account?: AccountModel;
}

export interface ReportModel {
  movementId?: number;
  date: string;
  client: string;
  accountNumber: string;
  type: string;
  initialBalance: number;
  state: boolean;
  movement: number;
  balance: number;
}