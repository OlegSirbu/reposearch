import React, { FC, useState } from "react";
import { Input } from "antd";
import { useDebounce } from "@/hooks/useDebounce";
import { SEARCH_DELAY } from "@/constants";

interface SearchInputProps {
  onSearch: (value: string) => void;
  delay?: number;
}

const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  delay = SEARCH_DELAY,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedSearch = useDebounce(onSearch, delay);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target?.value);
    debouncedSearch(event.target?.value);
  };

  return (
    <Input
      allowClear
      placeholder="Search"
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
export default SearchInput;
