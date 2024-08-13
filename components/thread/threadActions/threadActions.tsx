import Image from "next/image";

import ResponseIcon from "../../../assets/icons/common/response-icon.svg";
import SaveIcon from "../../../assets/icons/common/save-icon.svg";
import ShareIcon from "../../../assets/icons/common/share-icon.svg";

import { ThreadActionsWrapper } from "./threadActions.style";

const ThreadActions = () => {
  return (
    <ThreadActionsWrapper>
      <button>
        <Image src={ResponseIcon} alt="add a response" width={14} height={14} />
        Add response
      </button>
      <button>
        <Image src={SaveIcon} alt="save" width={14} height={14} />
      </button>
      <button>
        <Image src={ShareIcon} alt="share" width={14} height={14} />
      </button>
    </ThreadActionsWrapper>
  );
};

export default ThreadActions;
