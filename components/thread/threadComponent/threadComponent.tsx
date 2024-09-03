"use client";

import Link from "next/link";

import Tag from "@/components/common/tag/tag";
import ThreadActions from "../threadActions/threadActions";

import { ThreadType } from "@/types/thread/thread";

import useThreads from "@/hooks/useThreads";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { ThreadWrapper } from "./threadComponent.style";
import ThreadUser from "../threadUser/threadUser";

const Thread = ({ thread }: { thread: ThreadType }) => {
  const { getUserById, getClerkUserData } = useThreads();
  const [user, setUser] = useState<any>(null);

  const fetchUser = useCallback(async () => {
    try {
      const clerkId = await getUserById(thread.userId);
      const userData = await getClerkUserData(clerkId);
      setUser(userData);
    } catch (e) {
      console.error("Error fetching user data in useEffect:", e);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    
  }, [fetchUser]);

  return (
    <ThreadWrapper>
      <div className="thread-header">
        <Link className="title" href={`/thread/${thread.id}`}>
          {thread.title}
        </Link>
        <ThreadUser
          id={thread.userId}
          user={user}
          thread={thread}
          // isFollowing={thread.user.isFollowing ? true : undefined}
        />
      </div>
      <div className="tags">
        {thread.tags.slice(0, 5).map((tag) => (
          <Tag key={tag.id} text={tag.name} />
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: thread.description }} />
      <div className="thread-footer">
        <div className="data">
          <span>
            {thread.responses ? Number(thread.responses) : "0"} Responses
          </span>
          <span>{thread.views ? thread.views : "0"} Views</span>
        </div>
        <ThreadActions id={thread.id} />
      </div>
    </ThreadWrapper>
  );
};

export default Thread;
