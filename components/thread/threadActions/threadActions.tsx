import Image from "next/image";
import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";
import ResponseIcon from "../../../assets/icons/common/response-icon.svg";
import SaveIcon from "../../../assets/icons/common/save-icon.svg";
import ShareIcon from "../../../assets/icons/common/share-icon.svg";
import { ThreadActionsWrapper } from "./threadActions.style";
import { NewResponseForm } from "@/types/forms/newResponseForm";

type ThreadActionsProps = {
  id: number;
  onResponseCreate?: (responseData: NewResponseForm) => Promise<void>;
};

const ThreadActions = ({ id, onResponseCreate }: ThreadActionsProps) => {
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
        onResponseCreate &&
          onResponseCreate({
            _id: "",
            text: "",
            userId: "",
            threadId: id.toString(),
            images: [],
          });
      } else if (action === "save") {
      } else if (action === "share") {
        setIsOpenModal(true);
        setActiveModal("share");
        setShareLink(
          `${process.env.NEXT_PUBLIC_API_URL}thread/${id}`
        );
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