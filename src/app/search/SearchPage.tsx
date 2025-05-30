"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import Videos from "@/app/layout/Videos";
import Header from "../layout/Header";
import Category from "@/app/layout/Category";
import { useState } from "react";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  const [menuPressed, setMenuPressed] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-800">
      <Header
        onSearch={() => {}}
        searchQuery={query}
        menuPressed={menuPressed}
        setMenuPressed={setMenuPressed}
      />
      <div className="relative">
        <div className="fixed z-40 top-20 left-0 w-full h-20 caret-transparent bg-gray-800 sm:ml-24"></div>
        <div className="relative z-40">
          <Category />
        </div>
      </div>
      <div className="flex mt-32">
        <Videos searchQuery={query} />
      </div>
    </div>
  );
}

export default SearchPage;
