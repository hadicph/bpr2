import { Coordinates } from "./Coordinates";

export interface Delivery {
    id: string
    address: string;
    status: string;
    phone_number: string;
    package_number: string;
    name: string;
    created_at: string;
    updated_at: string;
    point: Coordinates;
  }