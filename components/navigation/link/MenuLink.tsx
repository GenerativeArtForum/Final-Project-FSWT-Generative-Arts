import { MenuLinkWrapper } from "./MenuLink.style";

const MenuLink = ({
  item,
  currentPath,
}: {
  item: {
    name: string;
    label: string;
    link: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  currentPath: string | null;
}) => {
  const isActive = currentPath === item.link;

  return (
    <MenuLinkWrapper
      href={item.link}
      $active={isActive}
    >
      <item.icon
        width="24"
        height="24"
        stroke={isActive ? "#5C8AFF" : "#444444"}
        strokeWidth={isActive ? (item.name === "search" ? 2 : 1.75) : 1}
      />
      {item.label}
    </MenuLinkWrapper>
  );
};

export default MenuLink;
