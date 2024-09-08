"use client";

import Link from "next/link";

import Tag from "@/components/common/tag/tag";
import ThreadActions from "../threadActions/threadActions";

import { ThreadType } from "@/types/thread/thread";

import useThreads from "@/hooks/useThreads";
import { useCallback, useEffect, useState } from "react";
import { ThreadWrapper } from "./threadComponent.style";
import ThreadUser from "../threadUser/threadUser";

const Thread = ({
  thread,
}: {
  thread: ThreadType;
}) => {

  return (
    <ThreadWrapper>
      <div className="thread-header">
        <Link className="title" href={`/thread/${thread.id}`}>
          {thread.title}
        </Link>
        <ThreadUser id={thread.userId} user={thread.user} thread={thread} />
      </div>
      {thread.tags.length > 0 && (
        <div className="tags">
          {thread.tags.slice(0, 5).map((tag) => (
            <Tag key={tag.id} text={tag.name} />
          ))}
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: thread.description }} />
      <div className="thread-footer">
        <div className="data">
          <span>
            {thread.responses ? Number(thread.responses) : "0"} Responses
          </span>
          {/* <span>{thread.views ? thread.views : "0"} Views</span> */}
        </div>
        <ThreadActions id={thread.id} />
      </div>
    </ThreadWrapper>
  );
};

export default Thread;
