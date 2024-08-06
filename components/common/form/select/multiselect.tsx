"use client";

import { NewThreadForm, Tag } from "@/types/forms/newThreadForm";

import { MultiSelectWrapper } from "./multiselect.style";

const MultiSelect = ({
  tagsList,
  newThreadFormState,
  setThreadData,
}: {
  tagsList: string[];
  newThreadFormState: {
    title: string;
    description: string;
    tags: Tag[];
  };
  setThreadData: (name: keyof NewThreadForm, value: string) => void;
}) => {
  return (
    <MultiSelectWrapper
      onChange={(e) => setThreadData("tags", e.target.value)}
      value={newThreadFormState.tags.map((tag) => tag.toString())}
    >
      {tagsList.map((tag, index) => (
        <option key={index} value={tag}>
          {tag}
        </option>
      ))}
    </MultiSelectWrapper>
  );
};

export default MultiSelect;
