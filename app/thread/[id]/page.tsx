"use client";

import { useParams } from "next/navigation";

import { ThreadPageWrapper } from "./page.style";

const ThreadPage = () => {
  const params = useParams();
  const userId = params.id;

  return (
    <ThreadPageWrapper>
      <span>Thread ID: {userId}</span>
    </ThreadPageWrapper>
  );
};

export default ThreadPage;
