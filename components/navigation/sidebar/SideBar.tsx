"use client";

import { usePathname } from "next/navigation";

import MenuLink from "../link/MenuLink.tsx";

import HomeIcon from "../../../assets/icons/menu/home.tsx";
import ProfileIcon from "../../../assets/icons/menu/profile.tsx";
import SavedIcon from "../../../assets/icons/menu/saved.tsx";
import SearchIcon from "../../../assets/icons/menu/search.tsx";
import SettingsIcon from "../../../assets/icons/menu/settings.tsx";

import { SideBarWrapper } from "./SideBar.style.tsx";

const SideBar = () => {
  const currentPath = usePathname();

  const menuItems = [
    { name: "home", label: "Home", link: "/", icon: HomeIcon },
    { name: "search", label: "Search", link: "/search", icon: SearchIcon },
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
    <SideBarWrapper>
      {menuItems.map((item) => (
        <MenuLink item={item} currentPath={currentPath} />
      ))}
    </SideBarWrapper>
  );
};

export default SideBar;
