import BinIcon from "../../../assets/icons/common/bin";

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
    <TagWrapper variant={variant}>
      {variant === 2 && <BinIcon className="bin-icon" onClick={onClick} />}
      {text}
    </TagWrapper>
  );
};

export default Tag;
