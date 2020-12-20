import { gql } from "apollo-boost";
export const LOGIN_QUERY = gql`
  query loginUser($username: String!, $password: String!) {
    userCheck(username: $username, password: $password) {
      user {
        id
        username
        deliver {
          id
        }
        business {
          id
        }
      }
      access_token
    }
  }
`;


export const USER_INFO_QUERY = gql`
  query infoQuery($user_id: ID, $business: Boolean, $deliver: Boolean) {
    userInfo(user_id: $user_id, business: $business, deliver: $deliver) {
      username
      manager
      position
      contact
      email
      deliver {
        address {
          address
          detail
        }
        id
        logistics
        charge
        conditional
      }
      business {
        representative
        license_name
        license_number
        tax_email
        started
        description

        profile_link
        license_link
        account_link

        client {
          client_1
          client_2
          client_3
          client_4
          client_5
        }
        client_types {
          id
        }
        main_businesses {
          id
        }

        factory_address {
          address
          detail
        }
        license_address {
          address
          detail
        }
      }
    }
  }
`;