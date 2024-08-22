import Link from "next/link";

import Vote from "../vote/vote";

import { ResponseType } from "@/types/thread/thread";

import { calculateTimeAgo } from "@/utils/date";

import { ResponseWrapper } from "./response.style";

const Response = ({ response }: { response: ResponseType }) => {
  const dateSincePosted = calculateTimeAgo(response.date);

  return (
    <ResponseWrapper>
      <div className="body">
        <Vote vote={response.votes} voteValue={response.personalVote} />
        <span className="text">{response.text}</span>
      </div>
      <div className="user">
        <Link href={`/user/${response.user.id}`} className="username">
          @{response.user.username}
        </Link>
        <span className="date">{dateSincePosted}</span>
      </div>
    </ResponseWrapper>
  );
};

export default Response;
