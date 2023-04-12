export interface Route {
    routeid: number;
    routename: string;
    start_address: string;
    end_address: string;
    userid: number;
    deliveries: any[];
    status: string;
    optimized: boolean;
    created_at: string;
    updated_at: string;
    hasStarted: boolean;
    estimated_time: number;
    estimated_distance: number;
  }