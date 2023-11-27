type TRepository = {
  name: string;
  stargazers: {
    totalCount: number;
  };
  forks: {
    totalCount: number;
  };
  url: string;
};

type TRepositoryRowProps = {
  name: string;
  starsCount: number;
  forksCount: number;
  url: string;
};
