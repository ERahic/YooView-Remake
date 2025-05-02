"use client";
import Header from "@/app/layout/Header";
import Sidebar from "@/app/layout/SideBar";
import Videos from "@/app/layout/Videos";
import Category from "@/app/layout/Category";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-blue-950">
      <Header />
      {/*Wrapper for category background width stretch */}
      <div className="relative">
        {/*Code below is to make the width of category component stretch while keeping tags and chevron arrows in middle */}
        <div className="fixed top-24 left-0 w-full h-14 z-10 bg-blue-950 dark:bg-black ml-24"></div>

        <div className="relative z-20">
          <Category />
        </div>
      </div>

      <div className="flex mt-32">
        <Sidebar menuExpand={false} />
        <Videos />
      </div>
    </div>
  );
}
