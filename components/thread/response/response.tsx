import Link from "next/link";

import Vote from "../vote/vote";

import { ResponseType } from "@/types/thread/thread";

import { calculateTimeAgo } from "@/utils/date";

import { ResponseWrapper } from "./response.style";
import { getUserByClerkId } from "@/db/users";

const Response = ({ response }: { response: ResponseType }) => {
  const dateSincePosted = calculateTimeAgo(response.createdAt);

  const username = response.user ? response.user.username : "Unknown User";

  return (
    <ResponseWrapper>
      <div className="body">
        <div dangerouslySetInnerHTML={{ __html: response.text }} />
      </div>
      <div className="user">
        <Link href={`/user/${response.userId}`} className="username">
          @{username}
        </Link>
        <span className="date">{dateSincePosted}</span>
      </div>
    </ResponseWrapper>
  );
};

export default Response;
