import Image from "next/image";

import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

import ResponseIcon from "../../../assets/icons/common/response-icon.svg";
import SaveIcon from "../../../assets/icons/common/save-icon.svg";
import ShareIcon from "../../../assets/icons/common/share-icon.svg";

import { ThreadActionsWrapper } from "./threadActions.style";

const ThreadActions = ({ id }: { id: number }) => {
  const { setIsOpenModal, setActiveModal, setShareLink } = useModal();
  const { isSignedIn } = useUser();

  const buttonClicked = (action: string) => {
    if (!isSignedIn && action !== "share") {
      setIsOpenModal(true);
      setActiveModal("login");
    } else {
      if (action === "response") {
        setIsOpenModal(true);
        setActiveModal("newResponse");
      } else if (action === "save") {
        console.log("save");
      } else if (action === "share") {
        setIsOpenModal(true);
        setActiveModal("share");
        setShareLink(`${process.env.NEXT_PUBLIC_SHARE_URL}/thread/${id}`);
      }
    }
  };

  return (
    <ThreadActionsWrapper>
      <button onClick={() => buttonClicked("response")}>
        <Image src={ResponseIcon} alt="add a response" width={14} height={14} />
        Add response
      </button>
      <button onClick={() => buttonClicked("save")}>
        <Image src={SaveIcon} alt="save" width={14} height={14} />
      </button>
      <button onClick={() => buttonClicked("share")}>
        <Image src={ShareIcon} alt="share" width={14} height={14} />
      </button>
    </ThreadActionsWrapper>
  );
};

export default ThreadActions;
