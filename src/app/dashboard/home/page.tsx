"use client";

import { useState } from "react";
import TopBar from "./top-bar";

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState("Top Stories");

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 space-y-5">
      <TopBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="text-xl mx-5">
        Showing content for:{" "}
        <span className="font-semibold">{selectedTab}</span>
      </div>
    </div>
  );
}
