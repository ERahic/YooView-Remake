"use client";
import Header from "@/app/layout/Header";
import Sidebar from "@/app/layout/SideBar";
import Videos from "@/app/layout/Videos";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen debug">
      <Header />
      <div className="flex mt-16">
        <Sidebar />
        <Videos />
      </div>
    </div>
  );
}
