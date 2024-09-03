"use client";

import { useParams } from "next/navigation";

import Tag from "@/components/common/tag/tag";
import ThreadActions from "@/components/thread/threadActions/threadActions";
import ThreadUser from "@/components/thread/threadUser/threadUser";

import Response from "@/components/thread/response/response";
import { useEffect, useState } from "react";
import { ThreadPageWrapper } from "./page.style";
import useThreads from "@/hooks/useThreads";

const ThreadPage = () => {
  const params = useParams();
  const { thread, error, loading, fetchSingleThread } = useThreads();

  useEffect(() => {
    if (params?.id) {
      const threadId = Array.isArray(params.id) ? params.id[0] : params.id;
      fetchSingleThread(threadId);
    }
  }, [params?.id]);

  // const [loadedResponses, setLoadedResponses] = useState(3);
  // const maxResponses = thread.responses.length;

  // const sortedResponses = thread.responses.sort((a, b) => b.votes - a.votes);
  // const displayedResponses = sortedResponses.slice(0, loadedResponses);

  // const handleLoadMore = () => {
  //   if (loadedResponses === maxResponses) {
  //     setLoadedResponses(3);
  //   } else {
  //     setLoadedResponses(loadedResponses + 3);
  //   }
  // };

  // const loadMoreButtonText =
  //   loadedResponses === maxResponses ? "Show Less" : "Load More";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!thread) {
    return <div>Thread not found.</div>;
  }

  return (
    <ThreadPageWrapper>
      <div className="container">
        <div className="thread-header">
          <h1 className="title">{thread.title}</h1>
          {/* <ThreadUser
            thread={thread}
            isFollowing={thread.user.isFollowing ? true : undefined}
          /> */}
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
        {/* <div className="responses-wrapper">
          <div className="responses">
            {displayedResponses.map((response, index) => (
              <Response key={index} response={response} />
            ))}
          </div>
          <button onClick={handleLoadMore} className="more-less">
            {loadMoreButtonText}
          </button>
        </div> */}
      </div>
    </ThreadPageWrapper>
  );
};

export default ThreadPage;
