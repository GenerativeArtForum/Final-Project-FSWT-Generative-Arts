import styled from "styled-components";

import { Colors } from "@/constants/Colors";

export const EditProfileModalWrapper = styled.div`
  .form-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 40vw;
    overflow-y: auto;
    padding-bottom: 1rem;
    padding: 3rem 4rem;
    max-height: 70vh;
  }

  h1 {
    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    width: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
  }

  .input-label {
    font-size: 14px;
    font-family: "Inter", sans-serif;
    font-weight: 300;
  }

  .cover-photo-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .cover-photo-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    input[type="radio"] {
      display: none;
    }
    label {
      cursor: pointer;
      display: inline-block;
      img {
        border: 2px solid transparent;
        border-radius: 4px;
        transition: border-color 0.3s;
        width: 100px;
        height: 100px;
        object-fit: cover;
        filter: saturate(0);
      }
    }
    input[type="radio"]:checked + label img {
      border-color: ${Colors.blue};
      filter: saturate(1);
    }

    .no-image-text {
      display: inline-block;
      text-align: center;
      font-size: 12px;
      color: ${Colors.gray};
    }
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    margin: 0;
    padding: 1rem 2rem;
    gap: 8px;
    background-color: ${Colors.pureWhite};
    border-top: 1px solid ${Colors.lightgray};
  }
`;
