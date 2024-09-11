/* eslint-disable react-hooks/exhaustive-deps */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import useSearch from "@/hooks/useSearch";
import Tag from "../../tag/tag";
import SearchBar from "../searchBar/searchBar";
import { MultiSelectWrapper } from "./multiselect.style";

import useThreads from "@/hooks/useThreads";
import { TagType } from "@/types/thread/thread";
import DownArrow from "../../../../assets/icons/common/down-arrow.svg";
import UpArrow from "../../../../assets/icons/common/up-arrow.svg";

const MultiSelect = ({
  tagsList,
  placeholder,
  selectedTags = [],
  maxTags,
  setThreadData,
  setSelectedTags,
  setTagParams,
}: {
  tagsList: TagType[];
  placeholder: string;
  selectedTags: TagType[];
  maxTags: number;
  setThreadData: any;
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
  setTagParams: (tagParams: string) => void;
}) => {
  const { toast } = useToast();
  const [multiselectOpen, setMultiselectOpen] = useState<boolean>(false);
  const [totalChars, setTotalChars] = useState<number>(0);
  const [maxChars, setMaxChars] = useState<number>(32);
  const multiselectRef = useRef<HTMLDivElement | null>(null);
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);

  const { text, setText, handleChangeText } = useSearch();

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

  const { createTag, fetchTags } = useThreads();

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

  const handleClickMultiSelect = (tag: TagType) => {
    if (
      selectedTags.length >= maxTags &&
      !selectedTags.some((selected) => selected.id === tag.id)
    ) {
      setToast(
        "error",
        undefined,
        `You can only select up to ${maxTags} tags` || undefined
      );
      return;
    }

    setSelectedTags((prevSelected: TagType[]) => {
      const isSelected = prevSelected.some(
        (selected) => selected.id === tag.id
      );
      const newSelected = isSelected
        ? prevSelected.filter((selected) => selected.id !== tag.id)
        : [...prevSelected, tag];

      updateTotalChars(newSelected);

      const tagIds = newSelected.map((tag) => tag.id);

      setThreadData("tagIds", tagIds);
      return newSelected;
    });
  };

  const handleDeleteTag = (tag: TagType) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag.id !== tag.id
    );
    setSelectedTags(updatedTags);
    updateTotalChars(updatedTags);
    setThreadData(
      "tagIds",
      updatedTags.map((tag) => tag.id)
    );
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

  const isTagSelected = (tag: TagType) => {
    return selectedTags.some((selected) => selected.id === tag.id);
  };

  useEffect(() => {
    setTagParams(`?search=${text}&limit=20`);
  }, [text]);

  const addCustomTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTag = await createTag(text);
      setSelectedTags((prevSelected) => [...prevSelected, newTag]);
      setText("");
      fetchTags();
    } catch (e: any) {
      setToast("error", "Failed to add tag", e.message);
    }
  };

  const isExactMatch = tagsList.some((tag) => tag.name === text);

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
              getDisplayedTags().map((tag) => (
                <Tag
                  key={tag.id}
                  text={tag.name}
                  variant={2}
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteTag(tag);
                  }}
                />
              ))
            ) : (
              <div className="selected-options">
                <div className="options-container">
                  {getDisplayedTags().map((tag) => (
                    <Tag
                      key={tag.id}
                      text={tag.name}
                      variant={2}
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteTag(tag);
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
            {tagsList.length > 0 ? (
              <>
                {tagsList.map((tag) => (
                  <div key={tag.id} className="button">
                    <label
                      className={`checkbox-label ${
                        isTagSelected(tag) ? "selected" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isTagSelected(tag)}
                        onChange={() => handleClickMultiSelect(tag)}
                      />
                      <button
                        type="button"
                        onClick={() => handleClickMultiSelect(tag)}
                      >
                        {tag.name}
                      </button>
                    </label>
                  </div>
                ))}
                {!isExactMatch && text !== "" && (
                  <div className="tag-not-found">
                    <span>Add another tag?</span>
                    <button onClick={addCustomTag}>
                      Add &apos;{text}&apos; manually
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="tag-not-found">
                <span>Tag not found</span>
                <button onClick={addCustomTag}>
                  Add &apos;{text}&apos; manually
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </MultiSelectWrapper>
  );
};

export default MultiSelect;
