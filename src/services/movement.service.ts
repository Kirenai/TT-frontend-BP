import { api } from "./axios.config"
import { MovementModel, ReportModel } from "../models/movement.model";

const URI = 'movements';

export const findMovements = async () => {
  const res =  await api.get<MovementModel[]>(URI);
  return res.data;
}

export const findMovement = async (movementId: number) => {
  const res = await api.get<MovementModel>(`${URI}/${movementId}`);
  return res.data;
}

export const findMovementsByDateAndCustomer = async (dateStart: string, dateEnd: string, customerId: number) => {
  const res = await api.get<ReportModel[]>(`${URI}/reports?date=${dateStart} ${dateEnd}&customerId=${customerId}`);
  return res.data
}

export const save = async (customer: MovementModel) => {
  await api.post<{success: boolean, message: string}>(URI, customer);
}

export const update = async (movementId: number, customer: MovementModel) => {
  return await api.put(`${URI}}/${movementId}`, customer);
}

export const remove = async (movementId: number) => {
  return await api.delete(`${URI}/${movementId}`);
}

