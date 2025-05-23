"use client";
import Header from "@/app/layout/Header";
import Videos from "@/app/layout/Videos";
import Category from "@/app/layout/Category";
import { useState } from "react";

export default function Home() {
  // Another useState but for search query, when user inputs text inside of search bar and either presses enter or search icon, youtube api should pull videos that are relevant to what user is searching for
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Need to make a handleSearch (onSearch) function to send the users search entry into videos so that the youtube api can pull the relevant videos
  function onSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-800">
      <Header onSearch={onSearch} searchQuery={searchQuery} />
      {/*Wrapper for category background width stretch */}
      <div className="relative">
        {/*Code below is to make the width of category component stretch while keeping tags and chevron arrows in middle */}
        <div className="fixed z-40 top-25 left-0 w-full h-14 bg-gray-800 ml-24"></div>

        <div className="relative z-40">
          <Category />
        </div>
      </div>

      <div className="flex mt-32">
        <Videos searchQuery={searchQuery} />
      </div>
    </div>
  );
}
