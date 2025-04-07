import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TopBarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function TopBar({ selectedTab, setSelectedTab }: TopBarProps) {
  const tabs = [
    "Top Stories",
    "For You",
    "Following",
    "Trending",
    "Tech",
    "Business",
    "Health",
    "Science",
    "World",
  ];

  return (
    <div className="w-full bg-white shadow">
      <div className="px-4 py-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Bloggy</h1>

        <div className="flex-1 flex justify-center px-5">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-10 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-black"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          </div>
        </div>

        <img
          src="/next.svg"
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border"
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="flex space-x-4 px-4 py-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(tab)}
              className={`text-sm font-medium whitespace-nowrap px-3 py-1 transition border-b-2 ${
                selectedTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-black hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
          <div>
            <Button
              className="w-full bg-blue-600 text-white text-1xl hover:bg-blue-700"
              size={"lg"}
            >
              {" "}
              + Create Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
