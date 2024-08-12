"use client";

import { usePathname } from "next/navigation";
import { SideBarWrapper } from "./SideBar.style.tsx";
import SideBarTag from "./sidebarTag.tsx";
import SideBarUser from "./sidebaruser.tsx";
import SearchBar from "@/components/common/form/searchBar/searchBar.tsx";
import useSearch from "@/hooks/useSearch.tsx";

const tags = [
  "Processing",
  "p5.js",
  "OpenFrameworks",
  "Cinder",
  "Max/MSP",
  "TouchDesigner",
  "Shader Programming",
  "Algorithmic Art",
  "Generative Art",
  "Creative Coding",
];

const speakers = [
  {
    username: "JohnDoe",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "JaneSmith",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "MichaelJohnson",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "EmilyDavis",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "DavidWilson",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "SarahThompson",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "DanielMartinez",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "OliviaAnderson",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "MatthewTaylor",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
  {
    username: "SophiaThomas",
    tag: tags[Math.floor(Math.random() * tags.length)],
    image: "",
  },
];

const SideBar = () => {
  const { text, handleChangeText } = useSearch();

  const currentPath = usePathname();

  return (
    <SideBarWrapper>
      {currentPath !== "/search" && (
      <div>
        <SearchBar text={text} onChangeText={handleChangeText} variant={1} />
      </div>
      )}
      <div className="side-tags-container">
        <h3>Popular today</h3>
        {tags.slice(0, 5).map((tag, index) => (
          <SideBarTag tag={tag} key={index} />
        ))}
      </div>
      <div className="side-users-container">
        <h3>Top speakers</h3>
        {speakers.slice(0, 3).map((speaker, index) => (
          <SideBarUser speaker={speaker} key={index} index={index} />
        ))}
      </div>
    </SideBarWrapper>
  );
};

export default SideBar;
