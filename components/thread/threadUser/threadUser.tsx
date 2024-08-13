import Image from "next/image";
import Link from "next/link";

import AddIcon from "../../../assets/icons/common/add.svg";
import TickIcon from "../../../assets/icons/common/tick.svg";

import { ThreadType } from "@/types/thread/thread";

import { calculateTimeAgo } from "@/utils/date";

import { ThreadUserWrapper } from "./threadUser.style";

const ThreadUser = ({ thread }: { thread: ThreadType }) => {
  const dateSincePosted = calculateTimeAgo(thread.date);

  return (
    <ThreadUserWrapper isFollowing={thread.user.isFollowing}>
      <Link href={`/user/${thread.user.id}`} className="thread-user">
        <div className="user-data">
          <span className="user-name">@{thread.user.username}</span>
          <span className="thread-date">{dateSincePosted}</span>
        </div>
        <div className="user-image">
          {thread.user.image !== "" ? (
            <Image
              src={thread.user.image}
              alt={thread.user.username}
              className="image"
            />
          ) : (
            <div className="image-fallback"></div>
          )}
          <div className="follow-button">
            <Image
              src={thread.user.isFollowing ? TickIcon : AddIcon}
              alt={thread.user.isFollowing ? "following" : "not following"}
              width={16}
              height={16}
            />
          </div>
        </div>
      </Link>
    </ThreadUserWrapper>
  );
};

export default ThreadUser;
