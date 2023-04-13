/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoute = /* GraphQL */ `
  subscription OnCreateRoute(
    $filter: ModelSubscriptionRouteFilterInput
    $owner: String
  ) {
    onCreateRoute(filter: $filter, owner: $owner) {
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
export const onUpdateRoute = /* GraphQL */ `
  subscription OnUpdateRoute(
    $filter: ModelSubscriptionRouteFilterInput
    $owner: String
  ) {
    onUpdateRoute(filter: $filter, owner: $owner) {
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
export const onDeleteRoute = /* GraphQL */ `
  subscription OnDeleteRoute(
    $filter: ModelSubscriptionRouteFilterInput
    $owner: String
  ) {
    onDeleteRoute(filter: $filter, owner: $owner) {
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
