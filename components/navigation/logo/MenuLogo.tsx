import { MenuLogoWrapper } from "./MenuLogo.style";

const MenuLogo = ({
  icon: Icon,
  link,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}) => {
  return (
    <MenuLogoWrapper href={link}>
      <Icon width="45" height="15" />
    </MenuLogoWrapper>
  );
};

export default MenuLogo;
