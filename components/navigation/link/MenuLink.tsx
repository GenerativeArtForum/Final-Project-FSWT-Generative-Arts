import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

import { Colors } from "@/constants/Colors";

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
  const { setIsOpenModal, setActiveModal } = useModal();
  const { isSignedIn } = useUser();

  const isActive = currentPath === item.link;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isSignedIn) {
      if (item.name === "create") {
        e.preventDefault();
        setIsOpenModal(true);
        setActiveModal("newThread");
      }
    } else if (
      !isSignedIn &&
      (item.name === "profile" ||
        item.name === "saved" ||
        item.name === "create")
    ) {
      e.preventDefault();
      setIsOpenModal(true);
      setActiveModal("login");
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
