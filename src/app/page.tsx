"use client";
import Header from "@/app/layout/Header";
import Sidebar from "@/app/layout/SideBar";
import Videos from "@/app/layout/Videos";
import Category from "@/app/layout/Category";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen bg-gray-800">
      <Header />
      <Category />
      <div className="flex mt-32">
        <Sidebar />
        <Videos />
      </div>
    </div>
  );
}
