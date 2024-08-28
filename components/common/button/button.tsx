import { ButtonWrapper } from "./button.style";

const Button = ({
  text,
  variant,
  onClick,
}: {
  text: string;
  variant: number;
  onClick: (e: any) => void;
}) => {
  return (
    <ButtonWrapper onClick={onClick} variant={variant}>
      {text}
    </ButtonWrapper>
  );
};
export default Button;
