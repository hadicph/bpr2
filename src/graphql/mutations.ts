/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const optimized = /* GraphQL */ `
  mutation Optimized($id: ID) {
    optimized(id: $id) {
      id
      route_name
      deliveries {
        id
        address
        status
        phone_number
        package_number
        name
        Created_At
        Updated_At
        point {
          longitude
          latitude
        }
      }
      start_address {
        longitude
        latitude
      }
      end_address {
        longitude
        latitude
      }
      date
      optimized
      Created_At
      Updated_At
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
export const startRoute = /* GraphQL */ `
  mutation StartRoute($id: ID) {
    startRoute(id: $id)
  }
`;
export const createRoute = /* GraphQL */ `
  mutation CreateRoute(
    $input: CreateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    createRoute(input: $input, condition: $condition) {
      id
      route_name
      deliveries {
        id
        address
        status
        phone_number
        package_number
        name
        Created_At
        Updated_At
        point {
          longitude
          latitude
        }
      }
      start_address {
        longitude
        latitude
      }
      end_address {
        longitude
        latitude
      }
      date
      optimized
      Created_At
      Updated_At
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
export const updateRoute = /* GraphQL */ `
  mutation UpdateRoute(
    $input: UpdateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    updateRoute(input: $input, condition: $condition) {
      id
      route_name
      deliveries {
        id
        address
        status
        phone_number
        package_number
        name
        Created_At
        Updated_At
        point {
          longitude
          latitude
        }
      }
      start_address {
        longitude
        latitude
      }
      end_address {
        longitude
        latitude
      }
      date
      optimized
      Created_At
      Updated_At
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
export const deleteRoute = /* GraphQL */ `
  mutation DeleteRoute(
    $input: DeleteRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    deleteRoute(input: $input, condition: $condition) {
      id
      route_name
      deliveries {
        id
        address
        status
        phone_number
        package_number
        name
        Created_At
        Updated_At
        point {
          longitude
          latitude
        }
      }
      start_address {
        longitude
        latitude
      }
      end_address {
        longitude
        latitude
      }
      date
      optimized
      Created_At
      Updated_At
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
