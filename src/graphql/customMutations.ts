export const updateUserPreferenceCustom = /* GraphQL */ `
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
      theme
    }
  }
`;