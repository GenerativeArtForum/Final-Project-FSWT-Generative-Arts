import Image from "next/image";
import Link from "next/link";

import { ThreadType } from "@/types/thread/thread";

import { calculateTimeAgo } from "@/utils/date";

import { ThreadUserWrapper } from "./threadUser.style";

const ThreadUser = ({
  id,
  user,
  thread,
  isFollowing,
}: {
  id: number | undefined;
  user: any;
  thread: ThreadType;
  isFollowing?: boolean | undefined;
}) => {
  if (!user) return null;

  const { imageUrl, username } = user;
  const dateSincePosted = calculateTimeAgo(thread.createdAt);

  return (
    <ThreadUserWrapper isfollowing={isFollowing}>
      <Link href={`/user/${id}`}>
        <div className="user-data">
          <span className="user-name">@{username}</span>
          <span className="thread-date">{dateSincePosted}</span>
        </div>
      </Link>
      <div className="user-image">
        {imageUrl ? (
          <Link href={`/user/${id}`}>
            <Image
              src={imageUrl}
              alt={username || "User image"}
              className="image"
              width={36}
              height={36}
            />
          </Link>
        ) : (
          <Link href={`/user/${id}`}>
            <div className="image-fallback"></div>
          </Link>
        )}
      </div>
    </ThreadUserWrapper>
  );
};

export default ThreadUser;
