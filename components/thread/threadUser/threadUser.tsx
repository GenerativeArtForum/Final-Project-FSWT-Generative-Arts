import Image from "next/image";
import Link from "next/link";

import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

import AddIcon from "../../../assets/icons/common/add.svg";
import TickIcon from "../../../assets/icons/common/tick.svg";

import { ThreadType } from "@/types/thread/thread";

import { calculateTimeAgo } from "@/utils/date";

import { ThreadUserWrapper } from "./threadUser.style";

const ThreadUser = ({
  thread,
  isFollowing,
}: {
  thread: ThreadType;
  isFollowing: boolean | undefined;
}) => {
  const { setIsOpenModal, setActiveModal } = useModal();
  const { isSignedIn } = useUser();

  const buttonClicked = () => {
    if (!isSignedIn) {
      setIsOpenModal(true);
      setActiveModal("login");
    }
  };

  const dateSincePosted = calculateTimeAgo(thread.date);

  return (
    <ThreadUserWrapper isfollowing={isFollowing}>
      <Link href={`/user/${thread.user.id}`}>
        <div className="user-data">
          <span className="user-name">@{thread.user.username}</span>
          <span className="thread-date">{dateSincePosted}</span>
        </div>
      </Link>
      <div className="user-image">
        {thread.user.image !== undefined && thread.user.image !== "" ? (
          <Link href={`/user/${thread.user.id}`}>
            <Image
              src={thread.user.image}
              alt={thread.user.username}
              className="image"
            />
          </Link>
        ) : (
          <Link href={`/user/${thread.user.id}`}>
            <div className="image-fallback"></div>
          </Link>
        )}
        <button className="follow-button" onClick={buttonClicked}>
          <Image
            src={thread.user.isFollowing ? TickIcon : AddIcon}
            alt={thread.user.isFollowing ? "following" : "not following"}
            width={16}
            height={16}
          />
        </button>
      </div>
    </ThreadUserWrapper>
  );
};

export default ThreadUser;
