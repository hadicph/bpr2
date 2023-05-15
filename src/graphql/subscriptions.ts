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
        status
        phone_number
        package_number
        name
        point {
          longitude
          latitude
          address
        }
        optimized
      }
      start_address {
        longitude
        latitude
        address
      }
      end_address {
        longitude
        latitude
        address
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
        status
        phone_number
        package_number
        name
        point {
          longitude
          latitude
          address
        }
        optimized
      }
      start_address {
        longitude
        latitude
        address
      }
      end_address {
        longitude
        latitude
        address
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
        status
        phone_number
        package_number
        name
        point {
          longitude
          latitude
          address
        }
        optimized
      }
      start_address {
        longitude
        latitude
        address
      }
      end_address {
        longitude
        latitude
        address
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
export const onCreateUserPreference = /* GraphQL */ `
  subscription OnCreateUserPreference(
    $filter: ModelSubscriptionUserPreferenceFilterInput
    $owner: String
  ) {
    onCreateUserPreference(filter: $filter, owner: $owner) {
      id
      start_address {
        longitude
        latitude
        address
      }
      end_address {
        longitude
        latitude
        address
      }
      owner
      theme
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserPreference = /* GraphQL */ `
  subscription OnUpdateUserPreference(
    $filter: ModelSubscriptionUserPreferenceFilterInput
    $owner: String
  ) {
    onUpdateUserPreference(filter: $filter, owner: $owner) {
      id
      start_address {
        longitude
        latitude
        address
      }
      end_address {
        longitude
        latitude
        address
      }
      owner
      theme
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserPreference = /* GraphQL */ `
  subscription OnDeleteUserPreference(
    $filter: ModelSubscriptionUserPreferenceFilterInput
    $owner: String
  ) {
    onDeleteUserPreference(filter: $filter, owner: $owner) {
      id
      start_address {
        longitude
        latitude
        address
      }
      end_address {
        longitude
        latitude
        address
      }
      owner
      theme
      type
      createdAt
      updatedAt
    }
  }
`;
