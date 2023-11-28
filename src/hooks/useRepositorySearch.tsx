import { useState, useCallback } from "react";
import { useQuery, ApolloError } from "@apollo/client";
import { GET_REPOSITORIES } from "src/graphql/queries";
import { PAGE_SIZE } from "src/constants";

interface PageInfo {
  endCursor: string | null;
}

interface QueryResult {
  search: {
    nodes: TRepository[];
    repositoryCount: number;
    pageInfo: PageInfo;
  };
}

interface UseRepositorySearchProps {
  data?: QueryResult;
  error?: ApolloError | undefined;
  loading: boolean;
  currentPage: number;
  handleSearch: (value: string) => void;
  handlePageChange: (value: number) => void;
}

export const useRepositorySearch = (): UseRepositorySearchProps => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const { data, loading, error, fetchMore } = useQuery<QueryResult>(
    GET_REPOSITORIES,
    {
      variables: { query, first: PAGE_SIZE, after: endCursor },
    }
  );

  const updateQuery = useCallback(
    (newQuery: string, newEndCursor: string | null, newCurrentPage: number) => {
      setQuery(newQuery);
      setEndCursor(newEndCursor);
      setCurrentPage(newCurrentPage);
    },
    []
  );

  const handleSearch = useCallback(
    (newQuery: string) => {
      updateQuery(newQuery, null, 1);
    },
    [updateQuery]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newEndCursor =
        (page !== 1 && data?.search?.pageInfo.endCursor) || null;
      updateQuery(query, newEndCursor, page);

      newEndCursor &&
        fetchMore({
          variables: {
            query,
            first: PAGE_SIZE,
            after: newEndCursor,
          },
        });
    },
    [query, data, updateQuery, fetchMore]
  );

  return {
    data,
    loading,
    error,
    currentPage,
    handleSearch,
    handlePageChange,
  };
};
