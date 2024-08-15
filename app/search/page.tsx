"use client";

import SearchBar from "@/components/common/form/searchBar/searchBar";
import useSearch from "@/hooks/useSearch";
import { SearchPageWrapper } from "./page.style";

const SearchPage = () => {
  const { text, handleChangeText } = useSearch();
  return (
    <SearchPageWrapper>
      <div className="container">
        <SearchBar
          text={text}
          onChangeText={handleChangeText}
          variant={1}
        />
      </div>
    </SearchPageWrapper>
  );
};

export default SearchPage;
