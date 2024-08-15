"use client";

import useSearch from "@/hooks/useSearch.tsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import SearchBar from "@/components/common/form/searchBar/searchBar.tsx";
import SideBarTag from "./sidebarTag.tsx";
import SideBarUser from "./sidebaruser.tsx";

import { SideBarWrapper } from "./SideBar.style.tsx";

const sideTags = [
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

const allSpeakers = [
  { username: "JohnDoe", tag: "", image: "" },
  { username: "JaneSmith", tag: "", image: "" },
  { username: "MichaelJohnson", tag: "", image: "" },
  { username: "EmilyDavis", tag: "", image: "" },
  { username: "DavidWilson", tag: "", image: "" },
  { username: "SarahThompson", tag: "", image: "" },
  { username: "DanielMartinez", tag: "", image: "" },
  { username: "OliviaAnderson", tag: "", image: "" },
  { username: "MatthewTaylor", tag: "", image: "" },
  { username: "SophiaThomas", tag: "", image: "" },
];

const SideBar = () => {
  const { text, handleChangeText } = useSearch();
  const currentPath = usePathname();

  const [speakers, setSpeakers] = useState(allSpeakers);
  const [randomSideTags, setRandomSideTags] = useState<string[]>([]);

  useEffect(() => {
    setRandomSideTags(sideTags.sort(() => 0.5 - Math.random()).slice(0, 5));

    setSpeakers(
      allSpeakers.map((speaker) => ({
        ...speaker,
        tag: sideTags[Math.floor(Math.random() * sideTags.length)],
      }))
    );
  }, []);

  return (
    <SideBarWrapper>
      {currentPath !== "/search" && (
        <div>
          <SearchBar text={text} onChangeText={handleChangeText} variant={2} />
        </div>
      )}
      <div className="side-tags-container">
        <h3>Popular today</h3>
        {randomSideTags.map((tag, index) => (
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
