import client from "./client";
import { gql } from "apollo-boost";

// 로그인
export const login = ({ id, password }) => client.post("/api/user/auth/login", { id, password });

export const register = form => {
  return form;
};

// 로그인 상태 확인
export const check = () => client.get("/api/user/auth/check");

// 로그아웃
export const logout = () => client.post("/api/user/auth/logout");

export const createUserMutation = gql`
  mutation newuser($input: UserInput!) {
    createUser(input: $input) {
      user {
        username
      }
      access_token
    }
  }
`;

export const createBusinessInfo = gql`
  mutation newBusiness(
    $input: BusinessInput!
    $client: ClientInput!
    $client_types: [ID]!
    $main_businesses: [ID]!
    $license_address: AddressInput!
    $factory_address: AddressInput!
    $profile_link: String!
    $license_link: String!
    $account_link: String!
  ) {
    createBusinessInfo(
      input: $input
      client: $client
      client_types: $client_types
      main_businesses: $main_businesses
      license_address: $license_address
      factory_address: $factory_address
      profile_link: $profile_link
      license_link: $license_link
      account_link: $account_link
    ) {
      message
    }
  }
`;

export const createUserDeliver = gql`
  mutation createUserDeliver($input: DeliveryInput!) {
    createUserDeliver(input: $input) {
      message
    }
  }
`;

export const loginQuery = gql`
  query loginUser($username: String!, $password: String!) {
    userCheck(username: $username, password: $password) {
      user {
        id
        individual
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

export const checkUsernameQuery = gql`
  query userOverlap($username: String!) {
    userOverlap(username: $username)
  }
`;

export const userInfo = gql`
  query userInfo($user_id: ID, $business: Boolean, $deliver: Boolean) {
    userInfo(user_id: $user_id, business: $business, deliver: $deliver) {
      username
      name
      info
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
        categoryId

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
          content
        }
        main_businesses {
          id
          content
        }

        factory_address {
          id
          address
          detail
        }
        license_address {
          id
          address
          detail
        }
      }
    }
  }
`;

export const getBusinessInfoQuery = gql`
  query businessInfo($user_id: ID) {
    businessInfo(user_id: $user_id) {
      representative
      license_name
      license_number
      tax_email
      description
      category {
        id
      }
    }
  }
`;

export const businessAddress = gql`
  query businessAddress($user_id: ID) {
    businessAddress(user_id: $user_id) {
      license_address {
        id
        address
        detail
      }
      factory_address {
        id
        address
        detail
      }
    }
  }
`;

export const getBusinessFile = gql`
  query businessFile($user_id: ID) {
    businessFile(user_id: $user_id) {
      profile_link
      license_link
      account_link
    }
  }
`;

export const getBusinessType = gql`
  query businessType($user_id: ID) {
    businessType(user_id: $user_id) {
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
    }
  }
`;

export const userSummary = gql`
  query summary($user_id: ID) {
    userSummary(user_id: $user_id) {
      license_name
      license_number
      profile_link
      category {
        content
      }
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
      message
    }
  }
`;

export const passwordCheck = gql`
  query passwordCheck($password: String!) {
    passwordCheck(password: $password)
  }
`;

export const updateDeliver = gql`
  mutation updateDeliver($input: DeliveryInput!) {
    updateDeliver(input: $input) {
      message
    }
  }
`;

export const deleteDeliver = gql`
  mutation deleteDeliver($id: ID!) {
    deleteDeliver(id: $id) {
      message
    }
  }
`;

export const updateBusinessType = gql`
  mutation updateBusinessType(
    $user_id: ID
    $client: ClientInput
    $client_types: [ID]
    $main_businesses: [ID]
  ) {
    updateBusinessType(
      user_id: $user_id
      client: $client
      client_types: $client_types
      main_businesses: $main_businesses
    ) {
      message
    }
  }
`;

export const updateBusinessAddress = gql`
  mutation updateBusinessAddress($license_address: AddressInput, $factory_address: AddressInput) {
    updateBusinessAddress(license_address: $license_address, factory_address: $factory_address) {
      message
    }
  }
`;

export const updateBusinessInfo = gql`
  mutation updateBusinessInfo($user_id: ID, $input: BusinessInput!) {
    updateBusinessInfo(user_id: $user_id, input: $input) {
      message
    }
  }
`;

export const updateBusinessFile = gql`
  mutation updateBusinessFile(
    $user_id: ID
    $profile_link: String
    $license_link: String
    $account_link: String
  ) {
    updateBusinessFile(
      user_id: $user_id
      profile_link: $profile_link
      license_link: $license_link
      account_link: $account_link
    ) {
      message
    }
  }
`;
