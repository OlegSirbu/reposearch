import { FC } from "react";
const LoadingSkeleton: FC = () => (
  <ul className="animate-pulse mt-5 space-y-4 px-2" data-testid="loading">
    {Array.from({ length: 10 }).map((_, index) => (
      <li
        key={index}
        className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-500"
      />
    ))}
  </ul>
);

export default LoadingSkeleton;
