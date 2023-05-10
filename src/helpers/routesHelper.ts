import { API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import { Coordinates, CoordinatesInput, CreateRouteMutation, CreateUserPreferenceMutation, DeleteRouteMutation, GetRouteQuery, ModelSortDirection, Route, RoutesByDateQuery, RoutesByDateQueryVariables, UpdateUserPreferenceMutation, UpdateUserPreferenceMutationVariables, UserPreference } from "../API";
import { createRoute, createUserPreference, deleteRoute, updateUserPreference } from "../graphql/mutations";
import { getRoute, routesByDate } from "../graphql/queries";
import { v4 as uuidv4 } from 'uuid';

//Dummy Data
const FakeCoordinates = {
    longitude: 123,
    latitude: 1234,
    address: "Horsens 123"
}
const FakeDeliveries = [
  {
    id: uuidv4(),
    address: "Horsens 123",
    status: "pending",
    phone_number: "1234567890",
    package_number: "1234567890",
    name: "John Doe",
    point: FakeCoordinates
  },
  {
    id: uuidv4(),
    address: "Aalborg 123",
    status: "pending",
    phone_number: "23674263423",
    package_number: "28347632784623",
    name: "John fran",
    point: FakeCoordinates
  },
  {
    id: uuidv4(),
    address: "Copenhagen 123",
    status: "pending",
    phone_number: "1234567890",
    package_number: "1234567890",
    name: "John CPH",
    point: FakeCoordinates
  }
]

//
const today: Date = new Date();
const formattedDate: string = today.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
//Creating Route
const saveRoute = async (
    route_name: string,
    // date: string
  ): Promise<Route | undefined> => {
    try {
      const res = (await API.graphql(
        graphqlOperation(createRoute, {
          input: {
            id: uuidv4(),
            route_name,
            deliveries: FakeDeliveries,
            start_address: FakeCoordinates,
            end_address: FakeCoordinates,
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
      const saveUserPreferance = async (
      ): Promise<UserPreference| undefined> => {
        try {
          const res = (await API.graphql(
            graphqlOperation(createUserPreference, {
              input: {
                start_address: FakeCoordinates,
                end_address: FakeCoordinates,
                theme: "light",
              },
            })
          )) as GraphQLResult<CreateUserPreferenceMutation>;
      
          const newUserPreferance = res.data?.createUserPreference;
      
          return newUserPreferance as UserPreference;
        } catch (err) {
          console.log("error creating route: ", err);
        }
      };

      const updateUserPreferenceCustom1 = async (
        id: string,
        //start_address: Coordinates, 
        //end_address: Coordinates,
        //theme: string
      ): Promise<UserPreference | undefined> => {
        try {
          const res = (await API.graphql(
            graphqlOperation(updateUserPreference, {
              input: {
                id: id,
                start_address: FakeCoordinates,
                end_address: FakeCoordinates,
                theme: "dark",
              },
            })
          )) as GraphQLResult<UpdateUserPreferenceMutation>;
          
          const newUserPreference = res.data?.updateUserPreference;

          return newUserPreference as UserPreference;
        } catch (err) {

          console.log("error updating user preference: ", err);
        }
      };

const updateUserPreferenceCustom = async (
  id: string,
  {
    start_address,
    end_address,
    theme,
  }: {
    start_address?: CoordinatesInput;
    end_address?: CoordinatesInput;
    theme?: string;
  }
) => {
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
    const op = graphqlOperation(updateUserPreference, variables);
    const res = (await API.graphql(
      op
    )) as GraphQLResult<UpdateUserPreferenceMutation>;

    return res.data?.updateUserPreference;
  } catch (err) {
    console.log("error updating user preference: ", err);
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
/*const getSuggestions = async (text: string, biasPosition: [number,number]) => {
  if (text.trim() === "") return [];
  const response = await Geo.searchByText(text, {
    maxResults: 5,
    biasPosition: biasPosition,
  });

  return response;
};
*/
  export {saveRoute,getRoutes,getRouteById,deleteRouteById,saveUserPreferance,updateUserPreferenceCustom};