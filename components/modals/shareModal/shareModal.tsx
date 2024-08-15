"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import useModal from "@/hooks/useModal";

import CrossIcon from "../../../assets/icons/common/cross.svg";

import { CommonIcons } from "@/constants/Icons";

import { ShareModalWrapper } from "./shareModal.style";

const ShareModal = ({ link }: { link: string }) => {
  const { closeModal } = useModal();
  const [copyText, setCopyText] = useState<string>("Copy");

  const textRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = async () => {
    try {
      if (textRef.current) {
        await navigator.clipboard.writeText(textRef.current.value);
        setCopyText("Copied");
        setTimeout(() => {
          setCopyText("Copy");
        }, 2000);
      }
    } catch (err) {
      setCopyText("Copy failed");
      setTimeout(() => {
        setCopyText("Copy");
      }, 2000);
    }
  };

  const socialLinks = [
    {
      name: "linkedin",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        link
      )}`,
    },
    {
      name: "whatsapp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`,
    },
    {
      name: "x",
      url: `https://x.com/intent/tweet?url=${encodeURIComponent(link)}`,
    },
    {
      name: "telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        link
      )}&text=${encodeURIComponent("Check this out!")}`,
    },
  ];

  return (
    <ShareModalWrapper>
      <div className="header">
        <h1>Share this thread</h1>
        <button className="cross" onClick={(e) => closeModal("close", e)}>
          <Image src={CrossIcon} alt="cross" />
        </button>
      </div>
      <div className="buttons-container">
        {socialLinks.map((social, index) => (
          <a
            className="button"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <div className="button-icon">
              <Image
                src={CommonIcons[social.name]}
                alt={social.name}
                width={28}
                height={28}
              />
            </div>
            {social.name[0].toUpperCase() + social.name.slice(1)}
          </a>
        ))}
      </div>
      <div className="share-link">
        <p>Or copy this link</p>
        <div className="link-container">
          <input value={link} disabled type="text" ref={textRef} />
          <button onClick={copyToClipboard}>{copyText}</button>
        </div>
      </div>
    </ShareModalWrapper>
  );
};

export default ShareModal;
