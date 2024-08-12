import Image from "next/image";

import CrossIcon from "../../../../assets/icons/common/cross.svg";
import SearchIcon from "../../../../assets/icons/common/search.svg";

import { SearchBarWrapper } from "./searchBar.style";

const SearchBar = ({
  text,
  variant,
  large,
  onChangeText,
}: {
  text: string;
  variant?: number | undefined;
  large?: boolean | undefined;
  onChangeText: (value: string) => void;
}) => {
  return (
    <SearchBarWrapper variant={variant} large={large}>
      {variant === 1 && (
        <Image src={SearchIcon} alt="search" className="icon" />
      )}
      <input
        type="text"
        value={text}
        placeholder="Search"
        onChange={(e: any) => onChangeText(e.target.value)}
      />
      {text !== "" && variant !== 1 && (
        <button className="cross" onClick={(e: any) => onChangeText("")}>
          <Image src={CrossIcon} alt="cross" />
        </button>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
