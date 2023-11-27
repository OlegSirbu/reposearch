import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RepositoryRow from "./RepositoryRow";

describe("RepositoryRow", () => {
  it("renders repository data", () => {
    const repository = {
      name: "React",
      stargazers: {
        totalCount: 1000,
      },
      forks: {
        totalCount: 500,
      },
      url: "https://github.com/facebook/react",
    };

    const { getByText } = render(
      <RepositoryRow
        key={repository.url}
        name={repository.name}
        starsCount={repository.stargazers.totalCount}
        forksCount={repository.forks.totalCount}
        url={repository.url}
      />
    );

    expect(getByText(repository.name)).toBeInTheDocument();
    expect(
      getByText(`Stars: ${repository.stargazers.totalCount}`)
    ).toBeInTheDocument();
    expect(
      getByText(`Forks: ${repository.forks.totalCount}`)
    ).toBeInTheDocument();
  });
});
