import { API, Geo, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import {CoordinatesInput, CreateRouteMutation, DeleteRouteMutation, DeliveryInput, GetRouteQuery, ListUserPreferencesQuery, ModelSortDirection, Route,
   RoutesByDateQuery, RoutesByDateQueryVariables, UpdateRouteMutation, UpdateRouteMutationVariables, 
   UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables, UserPreference,OptimizedMutation } from "../API";
import { createRoute, deleteRoute, optimized, updateRoute, updateUserPreference } from "../graphql/mutations";
import { getRoute, listUserPreferences, routesByDate } from "../graphql/queries";
import { v4 as uuidv4 } from 'uuid';



const today: Date = new Date();
const formattedDate: string = today.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');

//Creating Route
const saveRoute = async (
    route_name: string,
    start_address: CoordinatesInput,
    end_address: CoordinatesInput,
    
  ): Promise<Route | undefined> => {
    try {
      const res = (await API.graphql(
        graphqlOperation(createRoute, {
          input: {
            id: uuidv4(),
            route_name,
            deliveries: [],
            start_address: start_address,
            end_address: end_address,
            date: formattedDate,
            optimized: false,
            status: "active",
            hasStarted: false,
            estimated_time: 2,
            estimated_distance: 2,
            type: "route",
          },
        })
      )) as GraphQLResult<CreateRouteMutation>;
  
      const newRoute = res.data?.createRoute;
  
      return newRoute as Route;
    } catch (err) {
      console.log("error creating route: ", err);
    }
  };
  //Getting Routes
const getRoutes = async(future: boolean, nextToken?: string) => {
  
        const limit = 10;
      
        const load = async (
          future: boolean,
          limit: number,
          full: boolean = true,
          nextToken?: string
        ) => {
          const variables: RoutesByDateQueryVariables = {
            limit: limit,
            date: {
              [future ? "ge" : "lt"]: new Date().toISOString().split("T")[0],
            },
            type: "route",
            sortDirection: ModelSortDirection.ASC,
          };
      
          let routes: Route[] = [];
          let isFirstQuery = true;
          let nextPageNextToken: string | null | undefined = nextToken;
      
          while ((nextPageNextToken || isFirstQuery) && routes.length < limit) {
            isFirstQuery = false;
      
            const currentVars: RoutesByDateQueryVariables = {
              ...variables,
            };
            if (nextPageNextToken && nextPageNextToken !== "-1")
              currentVars.nextToken = nextPageNextToken;
            const op = graphqlOperation(routesByDate, currentVars);
            const res = (await API.graphql(
              op
            )) as GraphQLResult<RoutesByDateQuery>;
      
            if (
              !res.data ||
              !res.data.hasOwnProperty("routesByDate") ||
              !res.data.routesByDate?.hasOwnProperty("items") ||
              !res.data.routesByDate?.hasOwnProperty("nextToken")
            ) {
              throw new Error("Unable to load routes");
            }
      
            routes = routes.concat([
              ...(res.data?.routesByDate.items as Route[]),
            ]);
            nextPageNextToken = res.data?.routesByDate.nextToken;
      
            if (!full) {
              break;
            }
          }
      
          return {
            items: routes,
            nextToken: nextPageNextToken,
          } as {
            items: Route[];
            nextToken?: string;
          };
        };
      
        try {
          const { items, nextToken: newNextToken } = await load(
            future,
            limit,
            true,
            nextToken
          );
      
          let potentialNextPage: boolean = false;
          if (items.length === limit && newNextToken) {
            const { items } = await load(future, 1, false, newNextToken);
            potentialNextPage = items.length > 0;
          }
      
          return {
            routes: items,
            nextToken: potentialNextPage ? newNextToken : undefined,
          };
        } catch (err) {
          console.log("Error with getting routes: "+ err);
          throw err;
        }
      };
const getRouteById = async (id: string): Promise<Route | undefined> => {
        try {
          const operation = graphqlOperation(getRoute, { id: id });
          const response = (await API.graphql(operation)) as GraphQLResult<GetRouteQuery>;
      
          const route = response.data?.getRoute;
          if (!route) {
            throw new Error("Route not found");  
          }
          return route;
        } catch (err) {
          console.log("Error with getting route by id: "+ err);
          throw err;
        }
      };

const deleteRouteById = async (id: string) => {
  try {
    const op = graphqlOperation(deleteRoute, { input: { id: id } });
    return (await API.graphql(op)) as GraphQLResult<DeleteRouteMutation>;
  } catch (err) {
    console.log("Error with deleting route by id: "+ err);
    throw err;
  }
};
const getSuggestions = async (text: string) => {
  if (text.trim() === "") return [];
  const response = await Geo.searchByText(text, {
    maxResults: 5,
    countries: ["DNK"],
  });

  return response;
};

//TODO
const setDeliveryToDelivered = async (routeId:string , deliveryId: string) => {
  console.log("Setting delivery to delivered");
};

const renameRoute = async (id: string, newName: string) => {
  try {
    if (!newName) return;
    const variables: UpdateRouteMutationVariables = {
      input: {
        id: id,
      },
    };
    if (newName) variables.input.route_name = newName;
    const operation = graphqlOperation(updateRoute, variables);
    const response = (await API.graphql(
      operation
    )) as GraphQLResult<UpdateRouteMutation>;

    return response.data?.updateRoute;
  } catch (err) {
    console.log("error updating route: ", err);
  }
};

const setStartAndEndAddress = async (
  id: string,
  {
    start_address,
    end_address,
  }:{
    start_address?: CoordinatesInput;
    end_address?: CoordinatesInput;
  }) => {
    try {
      if (!start_address && !end_address) return;
      const variables: UpdateRouteMutationVariables = {
        input: {
          id: id,
        },
      };
      if (start_address) variables.input.start_address = start_address;
      if (end_address) variables.input.end_address = end_address;
      const operation = graphqlOperation(updateRoute, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateRouteMutation>;
  
      return response.data?.updateRoute;
    } catch (err) {
      console.log("error updating route: ", err);
    }
};

const setDefaultOptions = async (
  id: string,
  {
    start_address,
    end_address,
    theme,
  }:{
    start_address?: CoordinatesInput;
    end_address?: CoordinatesInput;
    theme?: string;
  }) => {
    try {
      if (!start_address && !end_address && !theme) return;
      const variables: UpdateUserPreferenceMutationVariables = {
        input: {
          id: id,
        },
      };
      if (start_address) variables.input.start_address = start_address;
      if (end_address) variables.input.end_address = end_address;
      if (theme) variables.input.theme = theme;
      const operation = graphqlOperation(updateUserPreference, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateUserPreferenceMutation>;
  
      return response.data?.updateUserPreference;
    } catch (err) {
      console.log("error updating route: ", err);
    }
};

const listUserPreference = async (): Promise<UserPreference[]> => {
  try {
    const operation = graphqlOperation(listUserPreferences);
    const response = (await API.graphql(
      operation
    )) as GraphQLResult<ListUserPreferencesQuery>;
    
    const userPreferences = response.data?.listUserPreferences?.items;
    if (!userPreferences) {
      throw new Error("User preferences not found");
    }
    return userPreferences as UserPreference[];
  } catch (err) {
    console.log("Error with getting user preferences: "+ err);
    throw err;
  }
};

const updateRouteDeliveries = async (
  id: string,
  {
    deliveries,
  }:{
    deliveries?: DeliveryInput[];
  }) => {
    try {
      if (!deliveries) return;
      const variables: UpdateRouteMutationVariables = {
        input: {
          id: id,
        },
      };
      if (deliveries) variables.input.deliveries = deliveries;
      const operation = graphqlOperation(updateRoute, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateRouteMutation>;
  
      return response.data?.updateRoute;
    } catch (err) {
      console.log("error updating route: ", err);
    }
  };

  const optimizeRoute = async (routeId: string) => {
    try {
      const operation = graphqlOperation(optimized, { id: routeId });
      const response = (await API.graphql(operation)) as GraphQLResult<OptimizedMutation>;

      const route = response.data;
      if (!route) {
        throw new Error("Route not found");
      }
      return route;
    } catch (err) {
      console.log("Error with optimizing route: "+ err);
      throw err;
    }
  };

export {saveRoute,getRoutes,getRouteById,deleteRouteById,optimizeRoute,setDeliveryToDelivered,
  getSuggestions,renameRoute,setStartAndEndAddress,setDefaultOptions,listUserPreference,updateRouteDeliveries};