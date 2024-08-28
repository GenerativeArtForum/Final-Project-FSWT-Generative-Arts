import Link from "next/link";

import Tag from "@/components/common/tag/tag";
import ThreadActions from "../threadActions/threadActions";
import ThreadUser from "../threadUser/threadUser";

import { ThreadType } from "@/types/thread/thread";

import { ThreadWrapper } from "./threadComponent.style";

const Thread = ({ thread }: { thread: ThreadType }) => {
  return (
    <ThreadWrapper>
      <div className="thread-header">
        <Link className="title" href={`/thread/${thread.id}`}>
          {thread.title}
        </Link>
        {/* <ThreadUser
          thread={thread}
          isFollowing={thread.user.isFollowing ? true : undefined}
        /> */}
      </div>
      <div className="tags">
        {thread.tags.slice(0,5).map((tag) => (
          <Tag key={tag.id} text={tag.name} />
        ))}
      </div>
      <span>{thread.description}</span>
      <div className="thread-footer">
        <div className="data">
          <span>{thread.responses ? Number(thread.responses) : '0'} Responses</span>
          <span>{thread.views ? thread.views : '0'} Views</span>
        </div>
        <ThreadActions id={thread.id} />
      </div>
    </ThreadWrapper>
  );
};

export default Thread;
