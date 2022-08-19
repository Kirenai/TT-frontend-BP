import { api } from "./axios.config"
import { AccountModel } from "../models/account.mode";

const URI = 'accounts';

export const findAccounts = async () => {
  const res =  await api.get<AccountModel[]>(URI);
  return res.data;
}

export const findAcount = async (accountId: number) => {
  const res = await api.get<AccountModel>(`${URI}/${accountId}`);
  return res.data;
}

export const save = async (account: AccountModel) => {
  return await api.post(URI, account);
}

export const update = async (accountId: number, account: AccountModel) => {
  return await api.put(`${URI}/${accountId}`, account);
}

export const remove = async (accountId: number) => {
  return await api.delete(`${URI}/${accountId}`);
}