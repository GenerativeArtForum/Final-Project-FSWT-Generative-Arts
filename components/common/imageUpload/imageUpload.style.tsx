import styled from "styled-components";

import { Colors, TagColors } from "@/constants/Colors";

export const ImageUploadWrapper = styled.div`
  position: relative;

  .image-preview {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .image-container {
    position: relative;

    &:hover {
      .bin-icon {
        opacity: 1;
      }
    }
  }

  .image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid ${Colors.lightgray};
  }

  .input {
    display: none;
  }

  .upload-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px 12px;
    border: 1px solid ${TagColors.border};
    background-color: ${TagColors.background};
    color: ${TagColors.text};
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
    transition: 0.25s;

    &:hover {
      opacity: 0.8;
    }
  }

  .bin-icon {
    position: absolute;
    z-index: 2;
    right: 2.5px;
    top: 2.5px;
    width: 24px;
    height: 24px;
    padding: 4px;
    background-color: ${TagColors.background};
    border-radius: 6px;
    border: 1px solid ${TagColors.border};
    opacity: 0;
    transition: 0.25s;
    cursor: pointer;
  }

  .feedback {
    position: absolute;
    height: 50px;
    left: 0;
    width: 100%;
    background-color: ${Colors.red};
    color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    padding: 14px;
    border-radius: 8px;
    z-index: 20;
    transition: opacity 0.5s ease;
    opacity: 0.8;
  }
`;
