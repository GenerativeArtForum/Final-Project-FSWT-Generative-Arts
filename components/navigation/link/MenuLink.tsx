import useModal from "@/hooks/useModal";
import { MenuLinkWrapper } from "./MenuLink.style";
import { Colors } from "@/constants/Colors";

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
  const { setIsOpenModal, setActiveModal } = useModal();

  const isActive = currentPath === item.link;

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (item.name === "create") {
      event.preventDefault();
      setIsOpenModal(true);
      setActiveModal("newThread");
    }
  };

  return (
    <MenuLinkWrapper href={item.link} $active={isActive} onClick={handleClick}>
      <item.icon
        width="24"
        height="24"
        stroke={isActive ? Colors.blue : Colors.gray}
        strokeWidth={isActive ? (item.name === "search" ? 2 : 1.75) : 1}
      />
      {item.label}
    </MenuLinkWrapper>
  );
};

export default MenuLink;
