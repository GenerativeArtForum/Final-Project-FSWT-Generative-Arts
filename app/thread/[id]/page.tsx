"use client";

import Tag from "@/components/common/tag/tag";
import Response from "@/components/thread/response/response";
import ThreadActions from "@/components/thread/threadActions/threadActions";
import ThreadUser from "@/components/thread/threadUser/threadUser";
import useModal from "@/hooks/useModal";
import useResponses from "@/hooks/useResponses";
import useThreads from "@/hooks/useThreads";
import { NewResponseForm } from "@/types/forms/newResponseForm";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ThreadPageWrapper } from "./page.style";

const ThreadPage = () => {
  const params = useParams();
  const { thread, loading, fetchSingleThread } = useThreads();
  const { setNewResponseFormState } = useModal();
  const { createResponse, refetchResponses } = useResponses();

  useEffect(() => {
    if (params?.id) {
      const threadId = Array.isArray(params.id) ? params.id[0] : params.id;
      fetchSingleThread(threadId);
      setNewResponseFormState((prevState) => ({
        ...prevState,
        threadId: params?.id,
      }));
    }
  }, [params?.id]);

  const handleResponseCreation = async (responseData: NewResponseForm) => {
    try {
      await createResponse(responseData);
      if (params?.id) {
        const threadId = Array.isArray(params.id) ? params.id[0] : params.id;
        await refetchResponses(threadId); // Refetch responses for the thread
        fetchSingleThread(threadId); // Ensure thread details are up-to-date
      }
    } catch (error) {
      console.error("Failed to create response:", error);
    }
  };

  if (loading || !thread) {
    return (
      <ThreadPageWrapper>
        <div className="container">
          <div className="loading" style={{ height: "300px" }}></div>
          <div className="loading" style={{ height: "50px" }}></div>
          <div className="loading" style={{ height: "50px" }}></div>
        </div>
      </ThreadPageWrapper>
    );
  }

  return (
    <ThreadPageWrapper>
      <div className="container">
        <div className="thread-header">
          <h1 className="title">{thread.title}</h1>
          <ThreadUser id={thread.userId} user={thread.user} thread={thread} />
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
              {Array.isArray(thread.responses) ? thread.responses.length : "0"}{" "}
              Responses
            </span>
          </div>
          <ThreadActions
            id={thread.id}
            onResponseCreate={handleResponseCreation}
          />
        </div>
        <div className="responses-wrapper">
          <div className="responses">
            {Array.isArray(thread.responses) &&
              thread.responses.map((response, index) => (
                <Response key={index} response={response} />
              ))}
          </div>
        </div>
      </div>
    </ThreadPageWrapper>
  );
};

export default ThreadPage;
