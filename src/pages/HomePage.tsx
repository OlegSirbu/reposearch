import { Suspense, FC } from "react";
import { Pagination } from "antd";
import { RepositoryList, SearchInput, LoadingSkeleton } from "@/components";
import { useRepositorySearch } from "@/hooks";
import { SEARCH_DELAY, PAGE_SIZE } from "@/constants";

const HomePage: FC = () => {
  const { data, loading, error, currentPage, handleSearch, handlePageChange } =
    useRepositorySearch();

  const hasRepositories = (data?.search?.nodes?.length ?? 0) > 0;
  const repositoryCount = data?.search.repositoryCount ?? 0;
  const shouldShowPagination = currentPage > 1 || repositoryCount > PAGE_SIZE;

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <h2>
          Oops, an error occurred. Please try again or check your GitHub token
          in README.
        </h2>
      );
    }
    if (!hasRepositories) {
      return <p>Empty list, please write the name of the repository.</p>;
    }
    return (
      <>
        <RepositoryList repositories={data?.search?.nodes ?? []} />
        {shouldShowPagination && (
          <Pagination
            className="flex justify-center"
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={repositoryCount}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        )}
      </>
    );
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="space-y-6">
        <SearchInput onSearch={handleSearch} delay={SEARCH_DELAY} />
        {renderContent()}
      </div>
    </Suspense>
  );
};

export default HomePage;
