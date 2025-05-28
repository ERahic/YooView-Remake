"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import Videos from "@/app/layout/Videos";
import Header from "../layout/Header";
import Category from "@/app/layout/Category";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-800">
      <Header onSearch={() => {}} searchQuery={query} />
      {/*Wrapper for category background width stretch */}
      <div className="relative">
        {/*Code below is to make the width of category component stretch while keeping tags and chevron arrows in middle */}
        <div className="fixed z-40 top-25 left-0 w-full h-14 bg-gray-800 ml-24"></div>

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
