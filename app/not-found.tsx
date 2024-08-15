"use client";

import useSearch from "@/hooks/useSearch";

import SearchBar from "@/components/common/form/searchBar/searchBar";

import { NotFoundPageWrapper } from "./not-found.style";

const Home = () => {
  const { text, handleChangeText } = useSearch();
  return (
    <NotFoundPageWrapper>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <div className="container">
        <SearchBar text={text} onChangeText={handleChangeText} variant={1} />
      </div>
    </NotFoundPageWrapper>
  );
};

export default Home;
