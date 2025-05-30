"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

// functions from SearchBar.tsx will be carried over to here for similar functionality on search and suggestion
function MobileSearchBar({ onClose }: { onClose: () => void }) {
  // will use a useState to track when the user clicks on the search Icon to trigger the search bar and input
  // const [mobileSearch, setMobileSearch] = useState<boolean>(false);
  const [searchEntered, setSearchEntered] = useState<string>("");
  const [suggestedString, setSuggestedString] = useState<string[]>([]);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  // useEffect to trigger the mobile keyboard to appear when the search Icon is tapped
  useEffect(() => {
    // autofocus on the input when the component mounts
    if (inputRef.current) inputRef.current.focus();
  }, []);

  //Fetch suggestions
  useEffect(() => {
    if (!searchEntered || !searchEntered.trim()) {
      setSuggestedString([]);
      return;
    }

    const fetchSearchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/youtube/suggestions?query=${encodeURIComponent(searchEntered)}`
        );
        const text = await response.text();
        // Fallback response if its empty
        if (!text || response.status === 204) {
          setSuggestedString([]); // if no text, array will be cleared
          return;
        }
        const match = text.match(/^\[.*\]$/); // Basic safety check to be certain that the response will start and end with square brackets since we are using an array that may have strings with special characters that can break JS
        if (match) {
          const json = JSON.parse(text);
          if (Array.isArray(json[1])) {
            const listOfSuggestions = json[1].map(
              (item: [string, number, unknown]) => item[0]
            ); // first thing in json [1] map each item in this array to the first element of that array [0] which will give string of suggestions
            setSuggestedString(listOfSuggestions);
          } else {
            console.warn("Unexpected suggestion format", json);
            setSuggestedString([]);
          }
        }
      } catch (error) {
        console.error("Error: Failed to fetch suggestoins", error);
      }
    };
    const debounce = setTimeout(fetchSearchSuggestions, 300); // use to give a delay on the execution so user is not shown suggestions immediately, without this can cause lag
    return () => clearTimeout(debounce);
  }, [searchEntered]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[999] bg-gray-800 flex flex-col">
      {/*Mobile search input*/}
      <div className="flex items-center w-full px-4 py-3 bg-gray-800">
        <input
          type="text"
          ref={inputRef}
          className="text-white text-3xl "
          placeholder="Search..."
          value={searchEntered}
          onChange={(e) => setSearchEntered(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(searchEntered);
          }}
        />
        <CloseIcon onClick={onClose} className="text-red-900 text-3xl ml-2" />
      </div>

      {/*Text to encourage user to type anything to watch their content will appear when the user is in mobile and no string has been entered in the search box*/}
      {searchEntered.trim() === "" ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center px-8 py-10 text-white">
          <Image
            src="/Yooview-logo-dark.png"
            alt="Yooview-logo"
            width={300}
            height={200}
            priority
          />
          <p className="text-white text-lg font-bold tracking-wide">
            SEARCH YOUR FAVOURITE CONTENT ON THE BEST STREAMING PLATFORM!
          </p>
        </div>
      ) : (
        suggestedString.length > 0 && (
          <div className="w-full px-4 py-2 bg-gray-800 overflow-y-auto flex flex-col">
            {suggestedString.map((string, index) => (
              <div
                key={index}
                onClick={() => handleSearch(string)}
                className="text-white px-4 py-3 border-b border-gray-700"
              >
                {string}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default MobileSearchBar;
