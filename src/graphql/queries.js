import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query getRepositories($query: String!, $first: Int, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          url
          forks {
            totalCount
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;
