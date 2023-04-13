import { API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import { CreateRouteMutation, ModelSortDirection, Route, RoutesByDateQuery, RoutesByDateQueryVariables } from "../API";
import { createRoute } from "../graphql/mutations";
import { routesByDate } from "../graphql/queries";
import { v4 as uuidv4 } from 'uuid';

const FakeCoordinates = {
    longitude: 0,
    latitude: 0,
}
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
            deliveries: [],
            start_address: FakeCoordinates,
            end_address: FakeCoordinates,
            date: formattedDate,
            optimized: false,
            Created_At: formattedDate,
            Updated_At: formattedDate,
            hasStarted: false,
            estimated_time: 0,
            estimated_distance: 0,
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
      
  export {saveRoute,getRoutes}