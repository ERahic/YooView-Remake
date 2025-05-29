"use client";
import Header from "@/app/layout/Header";
import Sidebar from "@/app/layout/SideBar";
import Videos from "@/app/layout/Videos";
import Category from "@/app/layout/Category";
import { useState } from "react";
import MobileNavigation from "@/app/layout/MobileSideBar";

export default function Home() {
  // Another useState but for search query, when user inputs text inside of search bar and either presses enter or search icon, youtube api should pull videos that are relevant to what user is searching for
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Need to make a handleSearch (onSearch) function to send the users search entry into videos so that the youtube api can pull the relevant videos
  function onSearch(query: string) {
    setSearchQuery(query);
  }

  // Need a useState to track menuexpand toggle for mobile and desktop but mobile specifically
  const [menuPressed, setMenuPressed] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-800">
      <Header
        onSearch={onSearch}
        searchQuery={searchQuery}
        menuPressed={menuPressed}
        setMenuPressed={setMenuPressed}
      />
      <div className="hidden sm:block">
        Desktop Sidebar
        <Sidebar
          //variant="desktop"
          menuExpand={menuPressed}
          setMenuExpand={setMenuPressed}
          onSearch={onSearch}
          searchQuery={searchQuery}
        />
      </div>
      {/* Show only on mobile when expanded
      {menuPressed && (
        <div className="fixed top-16 left-0 z-40 w-64 h-[calc(100%-5rem)] bg-gray-800 transition-transform duration-500 sm:hidden translate-x-0">
          <Sidebar
            //variant="mobile"
            menuExpand={true}
            setMenuExpand={setMenuPressed}
            onSearch={onSearch}
            searchQuery={searchQuery}
          />
        </div>
      )} */}
      <MobileNavigation onSearch={onSearch} />

      {/*MAIN CONTENT*/}
      <div className="relative flex flex-col min-h-screen bg-gray-800">
        {/*Wrapper for category background width stretch */}
        <div className="relative">
          {/*Code below is to make the width of category component stretch while keeping tags and chevron arrows in middle */}
          <div className="fixed z-40 top-20 w-full h-20 caret-transparent bg-gray-800 sm:ml-24"></div>

          <div className="relative z-40">
            <Category />
          </div>
        </div>

        <div className="flex mt-32">
          <Videos searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
