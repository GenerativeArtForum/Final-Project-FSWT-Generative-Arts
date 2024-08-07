"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Tag from "../../tag/tag";
import { MultiSelectWrapper } from "./multiselect.style";

import DownArrow from "../../../../assets/icons/common/down-arrow.svg";
import UpArrow from "../../../../assets/icons/common/up-arrow.svg";

import { NewThreadForm, TagType } from "@/types/forms/newThreadForm";

const MultiSelect = ({
  tagsList,
  placeholder,
  selectedTags,
  setThreadData,
  setSelectedTags,
}: {
  tagsList: string[];
  placeholder: string;
  selectedTags: TagType[] | null;
  setThreadData: (name: keyof NewThreadForm, value: TagType[]) => void;
  setSelectedTags: (tags: TagType[]) => void;
}) => {
  const [multiselectOpen, setMultiselectOpen] = useState<boolean>(false);
  const [totalChars, setTotalChars] = useState<number>(0);
  const multiselectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (multiselectRef.current && !multiselectRef.current.contains(event.target as Node)) {
        setMultiselectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (selectedTags === null) return;

  const updateTotalChars = (tags: TagType[]) => {
    const charCount = tags.reduce((total, tag) => total + tag.name.length, 0);
    setTotalChars(charCount);
  };

  const handleClickMultiSelect = (tagName: string) => {
    setSelectedTags((prevSelected) => {
      let newSelected: TagType[];
      if (prevSelected.some((selected: any) => selected.name === tagName)) {
        newSelected = prevSelected.filter(
          (selected: any) => selected.name !== tagName
        );
      } else {
        newSelected = [...prevSelected, { _id: "", name: tagName }];
      }

      updateTotalChars(newSelected);
      setThreadData("tags", newSelected);
      return newSelected;
    });
  };

  const handleDeleteTag = (tagName: string) => {
    const updatedTags = selectedTags.filter((tag) => tag.name !== tagName);
    setSelectedTags(updatedTags);
    updateTotalChars(updatedTags);
    setThreadData("tags", updatedTags);
  };

  const getDisplayedTags = () => {
    let charCount = 0;
    const displayTags: TagType[] = [];

    for (const tag of selectedTags) {
      if (charCount + tag.name.length + displayTags.length > 32) {
        break;
      }
      displayTags.push(tag);
      charCount += tag.name.length;
    }

    return displayTags;
  };

  const isTagSelected = (tagName: string) => {
    return selectedTags.some((tag) => tag.name === tagName);
  };

  return (
    <MultiSelectWrapper ref={multiselectRef}>
      <div
        className="input"
        onClick={() => setMultiselectOpen(!multiselectOpen)}
      >
        <div className="tags">
          {selectedTags.length > 0 ? (
            totalChars < 30 ? (
              getDisplayedTags().map((tag, index) => (
                <Tag
                  key={index}
                  text={tag.name}
                  variant={2}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteTag(tag.name);
                  }}
                />
              ))
            ) : (
              <div className="selected-options">
                <div className="options-container">
                  {getDisplayedTags().map((tag, index) => (
                    <Tag
                      key={index}
                      text={tag.name}
                      variant={2}
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteTag(tag.name);
                      }}
                    />
                  ))}
                  <span>...</span>
                </div>
                <Tag
                  text={`+${selectedTags.length - getDisplayedTags().length}`}
                />
              </div>
            )
          ) : (
            <input
              type="text"
              placeholder={placeholder}
              className="placeholder"
            />
          )}
        </div>
        <Image
          src={multiselectOpen ? UpArrow : DownArrow}
          alt="arrow"
          className="arrow"
          width={12}
          height={12}
        />
      </div>
      {multiselectOpen && (
        <div className="dropdown">
          {tagsList.map((tag, index) => (
            <div key={index} className="button">
              <label
                className={`checkbox-label ${
                  isTagSelected(tag) ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isTagSelected(tag)}
                  onChange={() => handleClickMultiSelect(tag)}
                ></input>
                <button value={tag} onClick={() => handleClickMultiSelect(tag)}>
                  {tag}
                </button>
              </label>
            </div>
          ))}
        </div>
      )}
    </MultiSelectWrapper>
  );
};

export default MultiSelect;
