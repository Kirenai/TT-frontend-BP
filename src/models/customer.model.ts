import { PersonModel } from "./person.model";

export interface CustomerModel {
    customerId?: number;
    password?: string
    state?: string
    person?: PersonModel
}