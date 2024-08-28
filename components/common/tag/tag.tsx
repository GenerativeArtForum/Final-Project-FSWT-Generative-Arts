import Image from "next/image";
import BinIcon from "../../../assets/icons/common/bin.svg";

import { TagWrapper } from "./tag.style";

const Tag = ({
  text,
  variant,
  onClick,
}: {
  text: string;
  variant?: number;
  onClick?: (e: any) => void;
}) => {
  return (
    <TagWrapper>
      {variant === 2 && (
        <div onClick={onClick} className="bin-icon">
          <Image src={BinIcon} alt="delete" />
        </div>
      )}
      {text}
    </TagWrapper>
  );
};

export default Tag;
