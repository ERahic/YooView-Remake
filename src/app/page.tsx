"use client";
import Header from "@/app/layout/Header";
import Sidebar from "@/app/layout/SideBar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
    <div className="flex-grow">
      <Header />
      </div>
    </div>
  );
}
