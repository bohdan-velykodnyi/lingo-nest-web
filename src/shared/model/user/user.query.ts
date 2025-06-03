import { graphql } from "@/shared/api";
import { useQuery } from "@apollo/client";

export const GET_USER = graphql(/* GraphQL */ `
  query getCurrentUser {
    getCurrentUser {
      id
      name
      email
      role
    }
  }
`);

export const useUser = () => useQuery(GET_USER);
