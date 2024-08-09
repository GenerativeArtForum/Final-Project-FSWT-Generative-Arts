import Image from "next/image";

import CrossIcon from "../../../../assets/icons/common/cross.svg";

import { SearchBarWrapper } from "./searchBar.style";

const SearchBar = ({
  text,
  onChangeText,
}: {
  text: string;
  onChangeText: (value: string) => void;
}) => {
  return (
    <SearchBarWrapper>
      <input
        type="text"
        value={text}
        placeholder="Search"
        onChange={(e: any) => onChangeText(e.target.value)}
      />
      {text !== "" && (
        <button className="cross" onClick={(e: any) => onChangeText('')}>
          <Image src={CrossIcon} alt="cross" />
        </button>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
