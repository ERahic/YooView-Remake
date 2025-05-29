import { Suspense } from "react";
import SearchPage from "./Search page";

export default function SearchPageWrapper() {
  return (
    <Suspense
      fallback={<div className="text-white p-4">Loading Search...</div>}
    >
      <SearchPage />
    </Suspense>
  );
}
