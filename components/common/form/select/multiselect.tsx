import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import useSearch from "@/hooks/useSearch";

import { useToast } from "@/components/ui/use-toast";
import Tag from "../../tag/tag";
import SearchBar from "../searchBar/searchBar";
import { MultiSelectWrapper } from "./multiselect.style";

import DownArrow from "../../../../assets/icons/common/down-arrow.svg";
import UpArrow from "../../../../assets/icons/common/up-arrow.svg";

import { NewThreadForm, TagType } from "@/types/forms/newThreadForm";

const MAX_TAGS = 6;

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
  const { toast } = useToast();

  const [multiselectOpen, setMultiselectOpen] = useState<boolean>(false);
  const [totalChars, setTotalChars] = useState<number>(0);
  const [maxChars, setMaxChars] = useState<number>(32);
  const multiselectRef = useRef<HTMLDivElement | null>(null);
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);

  const { text, handleChangeText } = useSearch();

  const setToast = (
    toastName: string,
    title?: string,
    description?: string,
    duration?: number
  ) => {
    toast({
      title,
      toastName,
      description,
      duration,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        multiselectRef.current &&
        !multiselectRef.current.contains(event.target as Node)
      ) {
        setMultiselectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (tagsContainerRef.current) {
      const containerWidth = tagsContainerRef.current.offsetWidth;
      const averageCharWidth = 10;
      const paddingBuffer = 20;

      const calculatedMaxChars = Math.floor(
        (containerWidth - paddingBuffer) / averageCharWidth
      );

      setMaxChars(calculatedMaxChars);
    }
  }, [selectedTags, multiselectOpen]);

  const updateTotalChars = (tags: TagType[]) => {
    const charCount = tags.reduce((total, tag) => total + tag.name.length, 0);
    setTotalChars(charCount);
  };

  if (!selectedTags) return null;

  const handleClickMultiSelect = (tagName: string) => {
    if (
      selectedTags.length >= MAX_TAGS &&
      !selectedTags.some((tag) => tag.name === tagName)
    ) {
      setToast(
        "error",
        undefined,
        `You can only select up to ${MAX_TAGS} tags` || undefined
      );

      return;
    }

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
      if (charCount + tag.name.length + displayTags.length > maxChars) {
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
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          setMultiselectOpen(!multiselectOpen);
        }}
      >
        <div className="tags" ref={tagsContainerRef}>
          {selectedTags.length > 0 ? (
            totalChars < maxChars ? (
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
                <div
                  title="Delete all the tags"
                  onClick={() => setSelectedTags([])}
                >
                  <Tag
                    text={`+${selectedTags.length - getDisplayedTags().length}`}
                    variant={2}
                  />
                </div>
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
          <div className="search-bar">
            <SearchBar
              text={text}
              onChangeText={handleChangeText}
              variant={0}
            />
          </div>
          <div className="options">
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
                  <button
                    value={tag}
                    onClick={() => handleClickMultiSelect(tag)}
                  >
                    {tag}
                  </button>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </MultiSelectWrapper>
  );
};

export default MultiSelect;
