import Tag from "@/components/common/tag/tag";
import ThreadUser from "../threadUser/threadUser";
import ThreadActions from "../threadActions/threadActions";

import { ThreadType } from "@/types/thread/thread";

import { ThreadWrapper } from "./threadComponent.style";

const Thread = ({ thread }: { thread: ThreadType }) => {
  return (
    <ThreadWrapper>
      <div className="thread-header">
        <h1>{thread.question}</h1>
        <ThreadUser thread={thread} />
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
        <ThreadActions />
      </div>
    </ThreadWrapper>
  );
};

export default Thread;
