import Image from "next/image";

import SmallButton from "../../smallButton/smallButton";
import { SearchBarWrapper } from "./searchBar.style";

import CrossIcon from "../../../../assets/icons/common/cross.svg";
import SearchIcon from "../../../../assets/icons/common/search.svg";

const SearchBar = ({
  text,
  variant,
  onChangeText,
}: {
  text: string;
  variant?: number | undefined;
  onChangeText: (value: string) => void;
}) => {
  return (
    <SearchBarWrapper variant={variant}>
      {variant === 1 && (
        <Image src={SearchIcon} alt="search" className="icon" />
      )}
      <input
        type="text"
        value={text}
        placeholder="Search"
        onChange={(e: any) => onChangeText(e.target.value)}
      />
      {text !== "" && variant === 0 && (
        <button className="cross" onClick={(e: any) => onChangeText("")}>
          <Image src={CrossIcon} alt="cross" />
        </button>
      )}
      {variant === 1 && (
        <SmallButton
          variant={2}
          icon="arrowRight"
          onClick={() => console.log("clicked")}
          hasText={text !== ""}
        />
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
