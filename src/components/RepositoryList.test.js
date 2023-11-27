import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RepositoryList from "./RepositoryList";

describe("RepositoryList", () => {
  it("renders a list of repositories", () => {
    const repositories = [
      {
        name: "React",
        stargazers: {
          totalCount: 1000,
        },
        forks: {
          totalCount: 500,
        },
        url: "https://github.com/facebook/react",
      },
      {
        name: "Vue",
        stargazers: {
          totalCount: 999,
        },
        forks: {
          totalCount: 888,
        },
        url: "https://github.com/vuejs/vue",
      },
    ];

    const { getByText } = render(
      <RepositoryList repositories={repositories} />
    );

    expect(getByText("React")).toBeInTheDocument();
    expect(getByText("Vue")).toBeInTheDocument();
    expect(getByText("Stars: 1000")).toBeInTheDocument();
    expect(getByText("Stars: 999")).toBeInTheDocument();
    expect(getByText("Forks: 500")).toBeInTheDocument();
    expect(getByText("Forks: 888")).toBeInTheDocument();
  });
});
