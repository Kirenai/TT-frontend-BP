import { api } from "./axios.config"
import { CustomerModel } from "../models/customer.model";

const URI = 'customers'

export const findCustomers = async () => {
  const res =  await api.get<CustomerModel[]>(URI);
  return res.data;
}

export const findCustomer = async (customerId: number) => {
  const res = await api.get<CustomerModel>(`${URI}/${customerId}`);
  return res.data;
}

export const save = async (customer: CustomerModel) => {
  return await api.post(URI, customer);
}

export const update = async (customerId: number, customer: CustomerModel) => {
  return await api.put(`${URI}/${customerId}`, customer);
}

export const remove = async (customerId: number) => {
  return await api.delete(`${URI}/${customerId}`);
}