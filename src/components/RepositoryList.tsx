import { FC } from "react";
import RepositoryRow from "./RepositoryRow";

const RepositoryList: FC<{ repositories: TRepository[] }> = ({
  repositories,
}): JSX.Element => (
  <div className="grid grid-cols-4 gap-y-3">
    {repositories.map((repo) => (
      <RepositoryRow
        key={repo.url}
        name={repo.name}
        starsCount={repo.stargazers?.totalCount}
        forksCount={repo.forks?.totalCount}
        url={repo.url}
      />
    ))}
  </div>
);

export default RepositoryList;
