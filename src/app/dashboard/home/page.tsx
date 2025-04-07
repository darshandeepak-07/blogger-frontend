"use client";

import PostCard from "@/components/ui/post.card";
import { useState } from "react";
import TopBar from "./top-bar";

const samplePosts = [
  {
    id: 1,
    title: "Exploring the Mountains",
    body: "Join us on a journey through the misty peaks and scenic trails.",
    imageUrl: "/next.svg",
  },
  {
    id: 2,
    title: "City Life Vibes",
    body: "The city never sleeps, and neither do its stories.",
    imageUrl: "/next.svg",
  },
  {
    id: 3,
    title: "Beachside Relaxation",
    body: "Feel the sand, hear the waves, and enjoy the sunshine.",
    imageUrl: "/next.svg",
  },
  {
    id: 4,
    title: "Night Sky Wonders",
    body: "A look into the stars that have inspired humans for centuries.",
    imageUrl: "/next.svg",
  },
  {
    id: 11,
    title: "Exploring the Mountains",
    body: "Join us on a journey through the misty peaks and scenic trails.",
    imageUrl: "/next.svg",
  },
  {
    id: 12,
    title: "City Life Vibes",
    body: "The city never sleeps, and neither do its stories.",
    imageUrl: "/next.svg",
  },
  {
    id: 13,
    title: "Beachside Relaxation",
    body: "Feel the sand, hear the waves, and enjoy the sunshine.",
    imageUrl: "/next.svg",
  },
  {
    id: 14,
    title: "Night Sky Wonders",
    body: "A look into the stars that have inspired humans for centuries.",
    imageUrl: "/next.svg",
  },
  {
    id: 15,
    title: "Exploring the Mountains",
    body: "Join us on a journey through the misty peaks and scenic trails.",
    imageUrl: "/next.svg",
  },
  {
    id: 66,
    title: "City Life Vibes",
    body: "The city never sleeps, and neither do its stories.",
    imageUrl: "/next.svg",
  },
  {
    id: 67,
    title: "Beachside Relaxation",
    body: "Feel the sand, hear the waves, and enjoy the sunshine.",
    imageUrl: "/next.svg",
  },
  {
    id: 38,
    title: "Night Sky Wonders",
    body: "A look into the stars that have inspired humans for centuries.",
    imageUrl: "/next.svg",
  },
  {
    id: 41,
    title: "Exploring the Mountains",
    body: "Join us on a journey through the misty peaks and scenic trails.",
    imageUrl: "/next.svg",
  },
  {
    id: 24,
    title: "City Life Vibes",
    body: "The city never sleeps, and neither do its stories.",
    imageUrl: "/next.svg",
  },
  {
    id: 31,
    title: "Beachside Relaxation",
    body: "Feel the sand, hear the waves, and enjoy the sunshine.",
    imageUrl: "/next.svg",
  },
  {
    id: 44,
    title: "Night Sky Wonders",
    body: "A look into the stars that have inspired humans for centuries.",
    imageUrl: "/next.svg",
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Top Stories");

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 space-y-5 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-slate-100 shadow-sm">
        <TopBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 pb-10">
        {samplePosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
