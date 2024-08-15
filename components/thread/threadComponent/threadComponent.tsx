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
          {thread.question}
        </Link>
        <ThreadUser
          thread={thread}
          isFollowing={thread.user.isFollowing ? true : undefined}
        />
      </div>
      <div className="tags">
        {thread.tags.map((tag) => (
          <Tag key={tag.id} text={tag.name} />
        ))}
      </div>
      <span>{thread.body}</span>
      <div className="thread-footer">
        <div className="data">
          <span>{thread.responses} Responses</span>
          <span>{thread.views} Views</span>
        </div>
        <ThreadActions id={thread.id} />
      </div>
    </ThreadWrapper>
  );
};

export default Thread;
