import { API, Geo, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import {CoordinatesInput, CreateRouteMutation, DeleteRouteMutation, DeliveryInput, GetRouteQuery, ListUserPreferencesQuery, ModelSortDirection, Route,
   RoutesByDateQuery, UpdateRouteMutation, UpdateRouteMutationVariables, 
   UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables, UserPreference,OptimizedMutation, DeleteDeliveryMutation, SetDeliveryStatusMutation} from "../API";
import { createRoute, deleteDelivery, deleteRoute, optimized, setDeliveryStatus, updateRoute, updateUserPreference } from "../graphql/mutations";
import { getRoute, listUserPreferences, routesByDate } from "../graphql/queries";
import { v4 as uuidv4 } from 'uuid';

//Getting todays date
const today: Date = new Date();
//Formatting the date to be in the format of yyyy-mm-dd
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
            //Create a uuid for the route
            //Assign all the required variables for the new route
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
      //create a new route from the response
      const newRoute = res.data?.createRoute;
      //return the new route
      return newRoute as Route;
    } catch (err) {
      //if there is an error, log it in the console
      console.log("error creating route: ", err);
    }
  };
  //Getting all routes by date
  //If future is set to true, it will get all routes that are in the future including today
  //If future is set to false, it will get all routes that are in the past
  const getRoutes = async (future:Boolean) => {
    try {
      const response = (await API.graphql(
        graphqlOperation(routesByDate, {
          date: {[future ? "ge" : "lt"]: formattedDate},
          type: "route",
          sortDirection: ModelSortDirection.ASC,
        })
        
      )) as GraphQLResult<RoutesByDateQuery>;
      //get all the routes from the response
      const routes = response.data?.routesByDate?.items;
      //if there are no routes, throw an error
      if (!routes) {
        throw new Error("No routes found");
      }
      //return the routes
      return routes as Route[];
    } catch (err) {
      console.log("error getting routes: ", err);
    }
  };
  //Getting a route by id
const getRouteById = async (id: string): Promise<Route | undefined> => {
        try {
          const operation = graphqlOperation(getRoute, { id: id });
          const response = (await API.graphql(operation)) as GraphQLResult<GetRouteQuery>;
          //get the route from the response
          const route = response.data?.getRoute;
          //if there is no route, throw an error
          if (!route) {
            throw new Error("Route not found");  
          }
          //return the route
          return route;
        } catch (err) {
          console.log("Error with getting route by id: "+ err);
          throw err;
        }
      };
      //Delete a route by id
const deleteRouteById = async (id: string) => {
  try {
    const op = graphqlOperation(deleteRoute, { input: { id: id } });
    return (await API.graphql(op)) as GraphQLResult<DeleteRouteMutation>;
  } catch (err) {
    console.log("Error with deleting route by id: "+ err);
    throw err;
  }
};
//Get suggestions for the address search bar
const getSuggestions = async (text: string) => {
  //if the text is empty, return an empty array
  if (text.trim() === "") return [];
  const response = await Geo.searchByText(text, {
    //set the max results to 5
    maxResults: 5,
    //set the countries to Denmark
    countries: ["DNK"],
  });

  return response;
};
//Renaming Route by id and new name
const renameRoute = async (id: string, newName: string) => {
  try {
    const variables: UpdateRouteMutationVariables = {
      //set the id and the new name
      input: {
        id: id,
        route_name: newName,
      },
    };
    const operation = graphqlOperation(updateRoute, variables);
    const response = (await API.graphql(
      operation
    )) as GraphQLResult<UpdateRouteMutation>;
    //get the updated route from the response
    return response.data?.updateRoute;
  } catch (err) {
    console.log("error updating route: ", err);
  }
};
//Setting start and end address for a route by id
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
      //if both start and end address is empty, return
      if (!start_address && !end_address) return;
      const variables: UpdateRouteMutationVariables = {
        input: {
          id: id,
        },
      };
      //if the start address is not empty, set the start address
      if (start_address) variables.input.start_address = start_address;
      //if the end address is not empty, set the end address
      if (end_address) variables.input.end_address = end_address;
      //update the route
      const operation = graphqlOperation(updateRoute, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateRouteMutation>;
  
      return response.data?.updateRoute;
    } catch (err) {
      console.log("error updating route: ", err);
    }
};
//Setting Default Options - User Preferences
//This method can accept single,double or triple options
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
      //if all options are empty, return
      if (!start_address && !end_address && !theme) return;
      const variables: UpdateUserPreferenceMutationVariables = {
        input: {
          id: id,
        },
      };
      //Check for valid options and set them
      if (start_address) variables.input.start_address = start_address;
      if (end_address) variables.input.end_address = end_address;
      if (theme) variables.input.theme = theme;
      //update the user preferences
      const operation = graphqlOperation(updateUserPreference, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateUserPreferenceMutation>;
      //return the updated user preferences
      return response.data?.updateUserPreference;
    } catch (err) {
      console.log("error updating route: ", err);
    }
};
//Getting user preferences list
//Each user has a single user preference therefore this method will return one value only
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
//Updating route deliveries
//This method is used to replace the route deliveries with a new list of deliveries
const updateRouteDeliveries = async (
  id: string,
  {
    deliveries,
  }:{
    deliveries?: DeliveryInput[];
  }) => {
    try {
      //if the deliveries are empty, return
      if (!deliveries) return;
      const variables: UpdateRouteMutationVariables = {
        input: {
          id: id,
          optimized: false,
          deliveries: deliveries,
        },
      };
      //update the route
      const operation = graphqlOperation(updateRoute, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateRouteMutation>;
      //return the updated route
      return response.data?.updateRoute;
    } catch (err) {
      console.log("error updating route: ", err);
    }
  };
  //Optimizing route by id
  //This method will use GraphQL mutation to call a lambda function to optimize the route
  //For more thorough explanation of the lambda function, please refer to the lambda function
  //Lambda Function Name: routeOptimizationFunction-env where env is the environment(dev,production)
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
  //Deleting delivery by id
  //This method will use GraphQL mutation to call a lambda function to delete the delivery
  //For more thorough explanation of the lambda function, please refer to the lambda function
  //Lambda Function Name: deleteDeliveryFunction-env where env is the environment(dev,production)
  const deleteDeliveryById = async (deliveryId: string, routeId: string) => {
    try {
      const operation = graphqlOperation(deleteDelivery, { id: deliveryId, routeId: routeId });
      const response = (await API.graphql(operation)) as GraphQLResult<DeleteDeliveryMutation>;
      const data = response.data;
      if (!data) {
        throw new Error("Delivery not found");
      }
      return data;
    } catch (error) {
      console.log("Error with deleting delivery: "+ error);
      throw error;
    }
  };
  //Setting Route Status
  const setRouteStatus = async (routeId: string,status:string) => {
    try {
      const variables: UpdateRouteMutationVariables = {
        //set the id and status to finished
        input: {
          id: routeId,
          status: status,
        },
      };
      const operation = graphqlOperation(updateRoute, variables);
      const response = (await API.graphql(
        operation
      )) as GraphQLResult<UpdateRouteMutation>;
      //Get the updated route from the response
      return response.data?.updateRoute;
    } catch (error) {
      console.log("Error with setting route to finished: "+ error);
      throw error;
    }
  };
const setDeliveryStatusHelper = async (deliveryId: string,routeId:string,status:string) => {
  try {
    const operation = graphqlOperation(setDeliveryStatus, { id: deliveryId, routeId: routeId,status:status });
    const response = (await API.graphql(operation)) as GraphQLResult<SetDeliveryStatusMutation>;
    const data = response.data;
    if (!data) {
      throw new Error("Delivery not found");
    }
    return data;
  } catch (error) {
    console.log("Error with deleting delivery: "+ error);
    throw error;
  }
};


  //Exporting all the methods to be used in other files
export {saveRoute,getRoutes,getRouteById,deleteRouteById,optimizeRoute,setDeliveryStatusHelper,
  getSuggestions,renameRoute,setStartAndEndAddress,setDefaultOptions,listUserPreference,
  updateRouteDeliveries,deleteDeliveryById,setRouteStatus};