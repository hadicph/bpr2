/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoute = /* GraphQL */ `
  query GetRoute($id: ID!) {
    getRoute(id: $id) {
      id
      route_name
      deliveries {
        id
        address
        status
        phone_number
        package_number
        name
        point {
          longitude
          latitude
        }
        optimized
      }
      start_address {
        longitude
        latitude
      }
      end_address {
        longitude
        latitude
      }
      status
      date
      optimized
      hasStarted
      estimated_time
      estimated_distance
      owner
      type
      createdAt
      updatedAt
    }
  }
`;
export const listRoutes = /* GraphQL */ `
  query ListRoutes(
    $filter: ModelRouteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        route_name
        deliveries {
          id
          address
          status
          phone_number
          package_number
          name
          optimized
        }
        start_address {
          longitude
          latitude
        }
        end_address {
          longitude
          latitude
        }
        status
        date
        optimized
        hasStarted
        estimated_time
        estimated_distance
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const routesByDate = /* GraphQL */ `
  query RoutesByDate(
    $type: String!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRouteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    routesByDate(
      type: $type
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        route_name
        deliveries {
          id
          address
          status
          phone_number
          package_number
          name
          optimized
        }
        start_address {
          longitude
          latitude
        }
        end_address {
          longitude
          latitude
        }
        status
        date
        optimized
        hasStarted
        estimated_time
        estimated_distance
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
