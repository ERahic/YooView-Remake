"use client";
import Header from "@/app/layout/Header";
import Sidebar from "@/app/layout/SideBar";
import Videos from "@/app/layout/Videos";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <Videos />
      </div>
    </div>
  );
}
