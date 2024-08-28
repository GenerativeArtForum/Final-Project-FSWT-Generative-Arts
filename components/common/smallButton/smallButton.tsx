import Image from "next/image";

import { CommonIcons } from "@/constants/Icons";

import { SmallButtonWrapper } from "./smallButton.style";

const SmallButton = ({
  text,
  icon,
  variant,
  hasText,
  onClick,
}: {
  text?: string;
  icon?: string;
  variant: number;
  hasText?: boolean;
  onClick: () => void;
}) => {
  return (
    <SmallButtonWrapper variant={variant} onClick={onClick} hasText={hasText}>
      {icon && (
        <Image
          src={CommonIcons[icon]}
          width={variant === 2 ? 14 : 11}
          height={variant === 2 ? 14 : 11}
          alt={icon}
        />
      )}
    </SmallButtonWrapper>
  );
};

export default SmallButton;
