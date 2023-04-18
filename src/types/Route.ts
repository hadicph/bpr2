import { Coordinates } from "./Coordinates";
import { Delivery } from "./Delivery";

export interface Route {
    id: string;
    routename: string;
    start_address: Coordinates;
    end_address: Coordinates;
    userid: string;
    deliveries: Delivery[];
    status: string;
    optimized: boolean;
    created_at: string;
    updated_at: string;
    hasStarted: boolean;
    estimated_time: number;
    estimated_distance: number;
  }