import qs from "qs";

import { gql } from "apollo-boost";

export const LIST_STORES_QUERY = gql`
  query list($page: Int!, $required: Boolean) {
    adminUser(page: $page, required: $required) {
      result {
        id
        contact
        manager
        position
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