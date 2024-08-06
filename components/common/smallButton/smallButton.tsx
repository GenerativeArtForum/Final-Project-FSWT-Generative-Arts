import Image from "next/image";
import { SmallButtonWrapper } from "./smallButton.style";
import { CommonIcons } from "@/constants/Icons";

const SmallButton = ({
  text,
  icon,
  variant,
  onClick,
}: {
  text?: string;
  icon?: string;
  variant: number;
  onClick: () => void;
}) => {
  return (
    <SmallButtonWrapper variant={variant} onClick={onClick}>
      {icon && (
        <Image src={CommonIcons[icon]} width={11} height={11} alt={icon} />
      )}
    </SmallButtonWrapper>
  );
};

export default SmallButton;
