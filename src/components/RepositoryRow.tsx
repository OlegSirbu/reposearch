import { FC } from "react";

const RepositoryRow: FC<TRepositoryRowProps> = ({
  name,
  starsCount,
  forksCount,
  url,
}) => (
  <>
    <a
      rel="noreferrer"
      href={url}
      target="_blank"
      className="col-span-2 text-sky-800 font-400">
      {name}
    </a>
    <span>Stars: {starsCount}</span>
    <span className="text-right">Forks: {forksCount}</span>
  </>
);

export default RepositoryRow;
