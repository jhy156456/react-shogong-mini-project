import { gql } from "apollo-boost";

export const LIST_STORES_QUERY = gql`
  query list($page: Int!, $required: Boolean) {
    adminUser(page: $page, required: $required) {
      result {
        id
        contact
        name
        info
        business {
          license_name
          category {
            content
          }
        }
      }
      total
    }
  }
`;