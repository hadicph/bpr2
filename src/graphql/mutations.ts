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
export const startRoute = /* GraphQL */ `
  mutation StartRoute($id: ID) {
    startRoute(id: $id)
  }
`;
export const setStartAddress = /* GraphQL */ `
  mutation SetStartAddress($id: ID) {
    setStartAddress(id: $id) {
      longitude
      latitude
    }
  }
`;
export const setEndAddress = /* GraphQL */ `
  mutation SetEndAddress($id: ID) {
    setEndAddress(id: $id) {
      longitude
      latitude
    }
  }
`;
export const setStartEndAddress = /* GraphQL */ `
  mutation SetStartEndAddress($id: ID) {
    setStartEndAddress(id: $id) {
      longitude
      latitude
    }
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
export const createUserPreference = /* GraphQL */ `
  mutation CreateUserPreference(
    $input: CreateUserPreferenceInput!
    $condition: ModelUserPreferenceConditionInput
  ) {
    createUserPreference(input: $input, condition: $condition) {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateUserPreference = /* GraphQL */ `
  mutation UpdateUserPreference(
    $input: UpdateUserPreferenceInput!
    $condition: ModelUserPreferenceConditionInput
  ) {
    updateUserPreference(input: $input, condition: $condition) {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserPreference = /* GraphQL */ `
  mutation DeleteUserPreference(
    $input: DeleteUserPreferenceInput!
    $condition: ModelUserPreferenceConditionInput
  ) {
    deleteUserPreference(input: $input, condition: $condition) {
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
      id
      createdAt
      updatedAt
    }
  }
`;
