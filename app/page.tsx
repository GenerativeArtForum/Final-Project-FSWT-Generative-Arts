"use client";

import useModal from "@/hooks/useModal";

import CreateThread from "@/components/common/createThread/createThread";
import TabsSwitcher from "@/components/common/tabsSwitcher/tabsSwitcher";

import { HomePageWrapper } from "./home.style";
import Thread from "@/components/thread/threadComponent/threadComponent";

export default function Home() {
  const { feedDisplay } = useModal();

  const threadsData = [
    {
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
      responses: 12,
      views: 310,
    },
    {
      question: "What are the best tools for creative coding in 2024?",
      user: {
        id: 2,
        username: "creativeCoderX",
        isFollowing: true,
        image: "",
      },
      date: "05/17/2023 02:14:45 PM",
      tags: [
        { id: 3, name: "creative coding" },
        { id: 4, name: "tools" },
      ],
      body: "I’m looking to expand my toolkit for creative coding. What are the best tools and languages to learn in 2024?",
      responses: 25,
      views: 1200,
    },
    {
      question: "Generative art: Random vs. Perlin noise?",
      user: {
        id: 3,
        username: "genArtMaster",
        isFollowing: false,
        image: "",
      },
      date: "07/28/2023 09:45:12 AM",
      tags: [
        { id: 5, name: "generative art" },
        { id: 2, name: "noise" },
      ],
      body: "I’ve seen a lot of generative art projects using both random noise and Perlin noise. What are the pros and cons of each?",
      responses: 15,
      views: 450,
    },
    {
      question: "How to animate generative art in Processing?",
      user: {
        id: 4,
        username: "visualize",
        isFollowing: true,
        image: "",
      },
      date: "08/15/2023 08:20:34 PM",
      tags: [
        { id: 6, name: "Processing" },
        { id: 7, name: "animation" },
      ],
      body: "I’m new to Processing and want to animate my generative art. What are some techniques to make smooth animations?",
      responses: 10,
      views: 600,
    },
    {
      question: "What is the role of randomness in generative design?",
      user: {
        id: 5,
        username: "designThinker",
        isFollowing: false,
        image: "",
      },
      date: "09/22/2023 03:12:10 PM",
      tags: [
        { id: 8, name: "generative design" },
        { id: 9, name: "randomness" },
      ],
      body: "How does randomness affect the outcome of generative design projects? Can controlled randomness lead to better results?",
      responses: 18,
      views: 820,
    },
    {
      question: "Best resources to learn generative art with JavaScript?",
      user: {
        id: 6,
        username: "webArtist",
        isFollowing: false,
        image: "",
      },
      date: "12/01/2023 07:55:28 AM",
      tags: [
        { id: 1, name: "JavaScript" },
        { id: 10, name: "learning resources" },
      ],
      body: "I’m interested in learning generative art using JavaScript. Any recommendations on books, tutorials, or courses?",
      responses: 8,
      views: 540,
    },
    {
      question: "How to create complex geometric patterns in generative art?",
      user: {
        id: 7,
        username: "geoArtEnthusiast",
        isFollowing: true,
        image: "",
      },
      date: "01/11/2024 05:33:19 PM",
      tags: [
        { id: 11, name: "geometric patterns" },
        { id: 5, name: "generative art" },
      ],
      body: "I’m fascinated by complex geometric patterns in generative art. What techniques can I use to create them programmatically?",
      responses: 22,
      views: 980,
    },
    {
      question: "Creative coding with GLSL: Where to start?",
      user: {
        id: 8,
        username: "shaderWizard",
        isFollowing: false,
        image: "",
      },
      date: "04/12/2024 11:22:43 AM",
      tags: [
        { id: 12, name: "GLSL" },
        { id: 13, name: "creative coding" },
      ],
      body: "I’m interested in using GLSL for creative coding projects. What are the best resources for beginners?",
      responses: 14,
      views: 700,
    },
    {
      question: "Combining AI with generative art: Your experiences?",
      user: {
        id: 9,
        username: "aiArtist",
        isFollowing: true,
        image: "",
      },
      date: "03/08/2024 02:30:50 PM",
      tags: [
        { id: 14, name: "AI" },
        { id: 5, name: "generative art" },
      ],
      body: "I’m exploring the intersection of AI and generative art. Has anyone experimented with AI-generated patterns or designs?",
      responses: 30,
      views: 1500,
    },
    {
      question: "How to use p5.js to create interactive generative art?",
      user: {
        id: 10,
        username: "interactionArtist",
        isFollowing: false,
        image: "",
      },
      date: "07/12/2024 10:10:05 AM",
      tags: [
        { id: 1, name: "p5.js" },
        { id: 15, name: "interactive" },
      ],
      body: "I want to make my generative art interactive using p5.js. What are some techniques or examples to get started?",
      responses: 20,
      views: 1000,
    },
  ];

  const followedThreads = threadsData
    .filter((thread) => thread.user.isFollowing)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const notFollowedThreads = threadsData
    .filter((thread) => !thread.user.isFollowing)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return (
    <HomePageWrapper>
      <TabsSwitcher />
      <CreateThread />
      <div className="container">
        {feedDisplay === 1
          ? followedThreads.map((thread, index) => (
              <Thread key={index} thread={thread} />
            ))
          : notFollowedThreads.map((thread, index) => (
              <Thread key={index} thread={thread} />
            ))}
      </div>
    </HomePageWrapper>
  );
}
