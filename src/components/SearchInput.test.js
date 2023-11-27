import { render, fireEvent, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";
import SearchInput from "@/components/SearchInput";
import { SEARCH_DELAY } from "@/constants";

jest.mock("@/hooks/useDebounce");

describe("SearchInput", () => {
  it("renders correctly", () => {
    useDebounce.mockImplementation((fn) => fn);
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={onSearch} />
    );
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    const onSearch = jest.fn();
    useDebounce.mockImplementation((fn) => fn);
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={onSearch} />
    );
    const input = getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  it("debounces onSearch function call", async () => {
    const onSearch = jest.fn();
    useDebounce.mockImplementation((fn, delay) => fn);

    const { getByPlaceholderText } = render(
      <SearchInput onSearch={onSearch} />
    );
    const input = getByPlaceholderText("Search");

    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
      await new Promise((r) => setTimeout(r, SEARCH_DELAY + 100));
    });

    expect(onSearch).toHaveBeenCalledWith("test");
  });
});
