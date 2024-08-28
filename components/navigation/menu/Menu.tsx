"use client";

import { usePathname } from "next/navigation";

import MenuLink from "../link/MenuLink.tsx";
import MenuLogo from "../logo/MenuLogo.tsx";

import CreateIcon from "../../../assets/icons/menu/create.tsx";
import HomeIcon from "../../../assets/icons/menu/home.tsx";
import LogoIcon from "../../../assets/icons/menu/logo.tsx";
import ProfileIcon from "../../../assets/icons/menu/profile.tsx";
import SavedIcon from "../../../assets/icons/menu/saved.tsx";
import SearchIcon from "../../../assets/icons/menu/search.tsx";
import SettingsIcon from "../../../assets/icons/menu/settings.tsx";
import ClerkUser from "../clerkUser/ClerkUser.tsx";

import { MenuWrapper } from "./Menu.style.tsx";

const Menu = () => {
  const currentPath = usePathname();

  const menuItems = [
    { name: "home", label: "Home", link: "/", icon: HomeIcon },
    { name: "search", label: "Search", link: "/search", icon: SearchIcon },
    { name: "create", label: "Create", link: "/create", icon: CreateIcon },
    { name: "saved", label: "Saved", link: "/saved", icon: SavedIcon },
    { name: "profile", label: "Profile", link: "/profile", icon: ProfileIcon },
    {
      name: "settings",
      label: "Settings",
      link: "/settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <MenuWrapper>
      <div className="links">
        <MenuLogo icon={LogoIcon} link={"/"} />
        {menuItems.map((item, index) => (
          <MenuLink key={index} item={item} currentPath={currentPath} />
        ))}
      </div>
      <div className="login">
        <ClerkUser />
      </div>
    </MenuWrapper>
  );
};

export default Menu;
