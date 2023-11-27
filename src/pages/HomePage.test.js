import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_REPOSITORIES } from "src/graphql/queries";
import HomePage from "./HomePage";

describe("HomePage Component", () => {
  describe("Loading State", () => {
    const mocks = [
      {
        request: {
          query: GET_REPOSITORIES,
          variables: {
            query: "",
            first: 10,
            after: null,
          },
        },
        result: {
          data: {},
        },
      },
    ];
    it("renders loading state", async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );

      expect(getByTestId("loading")).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("renders data correctly", async () => {
      const dataMocks = [
        {
          request: {
            query: GET_REPOSITORIES,
            variables: {
              query: "",
              first: 10,
              after: null,
            },
          },
          result: {
            data: {
              search: {
                repositoryCount: 1,
                nodes: [
                  {
                    name: "react",
                    url: "some-ulr",
                    stargazers: {
                      totalCount: 100,
                    },
                    forks: {
                      totalCount: 99,
                    },
                  },
                ],
              },
            },
          },
        },
      ];

      const { getByRole, queryByText } = render(
        <MockedProvider mocks={dataMocks} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );

      await waitFor(async () => {
        expect(getByRole("link", { name: "react" })).toHaveAttribute(
          "href",
          "some-ulr"
        );
        expect(queryByText("Stars: 100")).toBeInTheDocument();
        expect(queryByText("Forks: 99")).toBeInTheDocument();
      }, 500);
    });
  });

  describe("Error State", () => {
    it("should show error UI", async () => {
      const errorMocks = [
        {
          error: new Error("An error occurred"),
          request: {
            query: GET_REPOSITORIES,
            variables: {
              query: "",
              first: 10,
              after: null,
            },
          },
        },
      ];
      render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <HomePage />
        </MockedProvider>
      );
      expect(
        await screen.findByText(
          "Oops, an error occurred. Please try again or check your GitHub token in README."
        )
      ).toBeInTheDocument();
    });
  });
});
