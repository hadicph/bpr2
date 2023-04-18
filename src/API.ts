/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Route = {
  __typename: "Route",
  id: string,
  route_name: string,
  deliveries:  Array<Delivery | null >,
  start_address?: Coordinates | null,
  end_address?: Coordinates | null,
  status: string,
  date: string,
  optimized: boolean,
  hasStarted: boolean,
  estimated_time: number,
  estimated_distance: number,
  owner?: string | null,
  type: string,
  createdAt: string,
  updatedAt: string,
};

export type Delivery = {
  __typename: "Delivery",
  id: string,
  address: string,
  status?: string | null,
  phone_number?: string | null,
  package_number?: string | null,
  name?: string | null,
  point: Coordinates,
};

export type Coordinates = {
  __typename: "Coordinates",
  longitude: number,
  latitude: number,
};

export type CreateRouteInput = {
  id?: string | null,
  route_name: string,
  deliveries: Array< DeliveryInput | null >,
  start_address?: CoordinatesInput | null,
  end_address?: CoordinatesInput | null,
  status: string,
  date: string,
  optimized: boolean,
  hasStarted: boolean,
  estimated_time: number,
  estimated_distance: number,
  owner?: string | null,
  type: string,
};

export type DeliveryInput = {
  id?: string | null,
  address: string,
  status?: string | null,
  phone_number?: string | null,
  package_number?: string | null,
  name?: string | null,
  point: CoordinatesInput,
};

export type CoordinatesInput = {
  longitude: number,
  latitude: number,
};

export type ModelRouteConditionInput = {
  route_name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  date?: ModelStringInput | null,
  optimized?: ModelBooleanInput | null,
  hasStarted?: ModelBooleanInput | null,
  estimated_time?: ModelIntInput | null,
  estimated_distance?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelRouteConditionInput | null > | null,
  or?: Array< ModelRouteConditionInput | null > | null,
  not?: ModelRouteConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateRouteInput = {
  id: string,
  route_name?: string | null,
  deliveries?: Array< DeliveryInput | null > | null,
  start_address?: CoordinatesInput | null,
  end_address?: CoordinatesInput | null,
  status?: string | null,
  date?: string | null,
  optimized?: boolean | null,
  hasStarted?: boolean | null,
  estimated_time?: number | null,
  estimated_distance?: number | null,
  owner?: string | null,
  type?: string | null,
};

export type DeleteRouteInput = {
  id: string,
};

export type ModelRouteFilterInput = {
  id?: ModelIDInput | null,
  route_name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  date?: ModelStringInput | null,
  optimized?: ModelBooleanInput | null,
  hasStarted?: ModelBooleanInput | null,
  estimated_time?: ModelIntInput | null,
  estimated_distance?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelRouteFilterInput | null > | null,
  or?: Array< ModelRouteFilterInput | null > | null,
  not?: ModelRouteFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRouteConnection = {
  __typename: "ModelRouteConnection",
  items:  Array<Route | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionRouteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  route_name?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  optimized?: ModelSubscriptionBooleanInput | null,
  hasStarted?: ModelSubscriptionBooleanInput | null,
  estimated_time?: ModelSubscriptionIntInput | null,
  estimated_distance?: ModelSubscriptionIntInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRouteFilterInput | null > | null,
  or?: Array< ModelSubscriptionRouteFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type OptimizedMutationVariables = {
  id?: string | null,
};

export type OptimizedMutation = {
  optimized?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type StartRouteMutationVariables = {
  id?: string | null,
};

export type StartRouteMutation = {
  startRoute?: boolean | null,
};

export type CreateRouteMutationVariables = {
  input: CreateRouteInput,
  condition?: ModelRouteConditionInput | null,
};

export type CreateRouteMutation = {
  createRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRouteMutationVariables = {
  input: UpdateRouteInput,
  condition?: ModelRouteConditionInput | null,
};

export type UpdateRouteMutation = {
  updateRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRouteMutationVariables = {
  input: DeleteRouteInput,
  condition?: ModelRouteConditionInput | null,
};

export type DeleteRouteMutation = {
  deleteRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetRouteQueryVariables = {
  id: string,
};

export type GetRouteQuery = {
  getRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRoutesQueryVariables = {
  filter?: ModelRouteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoutesQuery = {
  listRoutes?:  {
    __typename: "ModelRouteConnection",
    items:  Array< {
      __typename: "Route",
      id: string,
      route_name: string,
      deliveries:  Array< {
        __typename: "Delivery",
        id: string,
        address: string,
        status?: string | null,
        phone_number?: string | null,
        package_number?: string | null,
        name?: string | null,
      } | null >,
      start_address?:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      } | null,
      end_address?:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      } | null,
      status: string,
      date: string,
      optimized: boolean,
      hasStarted: boolean,
      estimated_time: number,
      estimated_distance: number,
      owner?: string | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RoutesByDateQueryVariables = {
  type: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRouteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RoutesByDateQuery = {
  routesByDate?:  {
    __typename: "ModelRouteConnection",
    items:  Array< {
      __typename: "Route",
      id: string,
      route_name: string,
      deliveries:  Array< {
        __typename: "Delivery",
        id: string,
        address: string,
        status?: string | null,
        phone_number?: string | null,
        package_number?: string | null,
        name?: string | null,
      } | null >,
      start_address?:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      } | null,
      end_address?:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      } | null,
      status: string,
      date: string,
      optimized: boolean,
      hasStarted: boolean,
      estimated_time: number,
      estimated_distance: number,
      owner?: string | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRouteSubscriptionVariables = {
  filter?: ModelSubscriptionRouteFilterInput | null,
  owner?: string | null,
};

export type OnCreateRouteSubscription = {
  onCreateRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRouteSubscriptionVariables = {
  filter?: ModelSubscriptionRouteFilterInput | null,
  owner?: string | null,
};

export type OnUpdateRouteSubscription = {
  onUpdateRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRouteSubscriptionVariables = {
  filter?: ModelSubscriptionRouteFilterInput | null,
  owner?: string | null,
};

export type OnDeleteRouteSubscription = {
  onDeleteRoute?:  {
    __typename: "Route",
    id: string,
    route_name: string,
    deliveries:  Array< {
      __typename: "Delivery",
      id: string,
      address: string,
      status?: string | null,
      phone_number?: string | null,
      package_number?: string | null,
      name?: string | null,
      point:  {
        __typename: "Coordinates",
        longitude: number,
        latitude: number,
      },
    } | null >,
    start_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    end_address?:  {
      __typename: "Coordinates",
      longitude: number,
      latitude: number,
    } | null,
    status: string,
    date: string,
    optimized: boolean,
    hasStarted: boolean,
    estimated_time: number,
    estimated_distance: number,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
