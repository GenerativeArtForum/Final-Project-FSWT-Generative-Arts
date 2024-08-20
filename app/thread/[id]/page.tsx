"use client";

import { useParams } from "next/navigation";

import Tag from "@/components/common/tag/tag";
import ThreadActions from "@/components/thread/threadActions/threadActions";
import ThreadUser from "@/components/thread/threadUser/threadUser";

import Response from "@/components/thread/response/response";
import { useState } from "react";
import { ThreadPageWrapper } from "./page.style";

const ThreadPage = () => {
  const thread = {
    id: 1,
    question: "How to create a random noise texture in p5.js?",
    user: {
      id: 1,
      username: "artCoder101",
      isFollowing: false,
      image: "",
    },
    date: "03/01/2023 10:25:37 AM",
    tags: [
      { id: 1, name: "p5.js" },
      { id: 2, name: "noise" },
    ],
    body: "I am trying to create a random noise texture using p5.js for a generative art project. Any tips on how to get started?",
    views: 310,
    responses: [
      {
        id: 1,
        text: "You can use the `noise()` function in p5.js to create a random noise texture. Here's a simple example:",
        user: {
          id: 2,
          username: "codeMaster123",
          isFollowing: true,
          image: "",
        },
        votes: -2,
        date: "03/01/2023 10:30:15 AM",
      },
      {
        id: 2,
        text: "I recommend checking out the p5.js documentation for more information on creating generative art with noise textures.",
        user: {
          id: 3,
          username: "artLover456",
          isFollowing: false,
          image: "",
        },
        votes: 5,
        date: "03/01/2023 11:05:42 AM",
      },
      {
        id: 3,
        text: "Don't forget to experiment with different parameters for the `noise()` function to achieve the desired effect.",
        user: {
          id: 4,
          username: "creativeCoder789",
          isFollowing: true,
          image: "",
        },
        votes: 3,
        date: "03/01/2023 11:20:09 AM",
      },
      {
        id: 4,
        text: "You can use the `createNoiseTexture()` function from the p5-noise library to easily create a random noise texture in p5.js. You can use the `createNoiseTexture()` function from the p5-noise library to easily create a random noise texture in p5.js. You can use the `createNoiseTexture()` function from the p5-noise library to easily create a random noise texture in p5.js.",
        user: {
          id: 5,
          username: "p5Fanatic",
          isFollowing: true,
          image: "",
        },
        votes: 7,
        date: "03/01/2023 12:15:37 PM",
      },
      {
        id: 5,
        text: "I suggest using the `random()` function in combination with the `color()` function to generate a random color for each pixel in the noise texture.",
        user: {
          id: 6,
          username: "colorGenius",
          isFollowing: false,
          image: "",
        },
        votes: 2,
        date: "03/01/2023 12:30:55 PM",
      },
      {
        id: 6,
        text: "Consider using the `loadPixels()` and `updatePixels()` functions in p5.js to manipulate the pixel data of the noise texture.",
        user: {
          id: 7,
          username: "pixelMaster",
          isFollowing: true,
          image: "",
        },
        votes: 4,
        date: "03/01/2023 1:10:21 PM",
      },
      {
        id: 7,
        text: "You can use the `map()` function in p5.js to map the noise values to a specific range of values, such as colors or opacity.",
        user: {
          id: 8,
          username: "mappingExpert",
          isFollowing: false,
          image: "",
        },
        votes: 1,
        date: "03/01/2023 1:45:48 PM",
      },
      {
        id: 8,
        text: "Try experimenting with different noise algorithms, such as Perlin noise or Simplex noise, to achieve different visual effects in your texture.",
        user: {
          id: 9,
          username: "noiseExplorer",
          isFollowing: true,
          image: "",
        },
        votes: 6,
        date: "03/01/2023 2:20:15 PM",
      },
      {
        id: 9,
        text: "Don't forget to set the `noiseSeed()` to a specific value if you want to reproduce the same noise texture.",
        user: {
          id: 10,
          username: "seedMaster",
          isFollowing: false,
          image: "",
        },
        votes: 3,
        date: "03/01/2023 2:45:42 PM",
      },
    ],
  };

  const params = useParams();
  const userId = params.id;

  const [loadedResponses, setLoadedResponses] = useState(3);
  const maxResponses = thread.responses.length;

  const sortedResponses = thread.responses.sort((a, b) => b.votes - a.votes);
  const displayedResponses = sortedResponses.slice(0, loadedResponses);

  const handleLoadMore = () => {
    if (loadedResponses === maxResponses) {
      setLoadedResponses(3);
    } else {
      setLoadedResponses(loadedResponses + 3);
    }
  };

  const loadMoreButtonText =
    loadedResponses === maxResponses ? "Show Less" : "Load More";

  return (
    <ThreadPageWrapper>
      <div className="container">
        <div className="thread-header">
          <h1 className="title">{thread.question}</h1>
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
            <span>{thread.responses.length} Responses</span>
            <span>{thread.views} Views</span>
          </div>
          <ThreadActions id={thread.id} />
        </div>
        <div className="responses-wrapper">
          <div className="responses">
            {displayedResponses.map((response, index) => (
              <Response key={index} response={response} />
            ))}
          </div>
          <button onClick={handleLoadMore} className="more-less">{loadMoreButtonText}</button>
        </div>
      </div>
    </ThreadPageWrapper>
  );
};

export default ThreadPage;
