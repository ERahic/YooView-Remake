// need to handle state for when user clicks on search bar
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";

// by default, the search bar is not focused on until clicked on

// Need to create SearchBar type that will hold prop onSearch, this will make the searchbar component accept props inside the prop holder variable
type SearchBarProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

function SearchBar({ onSearch, searchQuery }: SearchBarProps) {
  // useState for when the searchbar itself is clicked on by the user to have transition and blur effects work
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  // Creating a ref to have onBlur work for search bar when user enters a string and presses "Enter" key or search icon, inputRef will be assigned to <input>
  const inputRef = useRef<HTMLInputElement>(null);

  // Another useState but for tracking what user has entered in search and youtube api will fetch videos related to searched input
  const [searchEntered, setSearchEntered] = useState<string>("");

  //useState to track the index of the currently selected suggestion in the dropbox
  const [highlightSuggestionIndex, setHighlightSuggestionIndex] =
    useState<number>(-1);

  // useState to track users input and offer suggestions in a drop box like how any website with a search bar would provide. Will need to be an array since it will hold multiple suggestions for user
  const [suggestedString, setSuggestedString] = useState<string[]>([]);
  const [showSuggestedString, setShowSuggestedString] =
    useState<boolean>(false);

  // Use effect to reset the input whenever the page refreshes via click on logo or home icon
  useEffect(() => {
    setSearchEntered(searchQuery);
  }, [searchQuery]);

  // useEffect to reset the index of highlighted suggestion when the suggestions change
  useEffect(() => {
    setHighlightSuggestionIndex(-1);
  }, [suggestedString]);

  // useEffect for when the user inputs anything in text and the suggestions will trigger everytime a new string is added or removed
  useEffect(() => {
    if (!searchEntered || !searchEntered.trim()) {
      setSuggestedString([]); // If there is nothing inside of the searchbar, return an empty array
      return;
    }

    // Fetch the suggestions so that they can be displayed when user is typing anything in searchbar
    const fetchSearchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/youtube/suggestions?query=${encodeURIComponent(searchEntered)}`
        );
        const text = await response.text();
        //Fallback response if its empty
        if (!text || response.status === 204) {
          setSuggestedString([]); // If theres no text, the array will be cleared
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
            console.warn("Unexpected suggestion format:", json);
            setSuggestedString([]);
          }
        }
      } catch (error) {
        console.error("Error: Failed to fetch suggestions", error);
      }
    };

    const debounce = setTimeout(fetchSearchSuggestions, 300); // use to give a delay on the execution so user is not shown suggestions immediately, without so can cause lag
    return () => clearTimeout(debounce);
  }, [searchEntered]);

  // test to see if suggested string is working inside the console
  useEffect(() => {
    console.log("search entered", searchEntered);
    console.log("suggested string updated", suggestedString);
  }, [searchEntered, suggestedString]);

  // new handleSearch to have user be redirected to new page returning videos that the user was searching for
  const router = useRouter();
  const SearchPageHandle = () => {
    if (searchEntered.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchEntered)}`);
    }
  };

  // use clsx and useState to make search bar expand a bit when clicked on,
  return (
    <>
      <div className="hidden sm:flex gap-2 pr-60">
        {/*Search Bar*/}
        {/*Magnifying glass appears when searchbar is clicked on*/}
        <div className="relative flex">
          {searchClicked && (
            <SearchIcon className="absolute mt-2.5 ml-4 text-gray-500"></SearchIcon>
          )}
          {/*In order to have useStates for searched & setSearched, need to use onChange and onKeyDown for when user types anything in searchbar and will get automatically updated*/}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search!"
            value={searchEntered}
            className={clsx(
              "border-1 border-blue-500 rounded-full w-150 text-start pl-4",
              {
                "border-1 border-blue-500 rounded-full w-150 text-start pl-4 caret-transparent":
                  !searchClicked,
                "outline-none border-1 border-green-800 rounded-full w-175 text-start pl-12":
                  searchClicked,
              }
            )}
            onFocus={() => {
              setSearchClicked(true);
              setShowSuggestedString(true);
            }}
            onBlur={() => {
              setSearchClicked(false);
              setTimeout(() => setShowSuggestedString(false), 200);
            }}
            onChange={(e) => setSearchEntered(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightSuggestionIndex((prev) =>
                  Math.min(prev + 1, suggestedString.length - 1)
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightSuggestionIndex((prev) => Math.max(prev - 1, -1));
              } else if (e.key === `Enter`) {
                e.preventDefault();
                const query =
                  highlightSuggestionIndex >= 0
                    ? suggestedString[highlightSuggestionIndex]
                    : searchEntered;
                router.push(`/search?q=${encodeURIComponent(query)}`);
                setSearchClicked(false);
                setShowSuggestedString(false);
                inputRef.current?.blur(); // Will remove the focus when "Enter" key is pressed
                console.log(`Entered: ${query}`);
              }
            }}
          />
          {searchEntered && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // prevents the default blur from occuring when closing icon is clicked rather than outside of the search bar
                setSearchEntered("");
              }}
              className="absolute right-3 top-2 text-red-500"
            >
              <CloseIcon />
            </button>
          )}
          {/*Here will have the suggestions be shown to the user once they start typing anything in the search bar*/}
          {showSuggestedString && suggestedString.length > 0 && (
            <div className="absolute top-full z-[999] mt-2 w-full bg-gray-700 border border-blue-950 rounded-md shadow-md text-white">
              {suggestedString.map((string, index) => (
                <div
                  key={index}
                  className={clsx(
                    "p-2 cursor-pointer",
                    highlightSuggestionIndex === index
                      ? "bg-blue-600 text white"
                      : "hover:bg-gray-600"
                  )}
                  onMouseDown={() => {
                    setSearchEntered(string);
                    onSearch(string); // This will perform the search ASAP
                    setShowSuggestedString(false);
                    SearchPageHandle();
                  }}
                >
                  {string}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-1 border-blue-950 rounded-full">
          <IconButton
            onMouseDown={(e) => {
              e.preventDefault();
              if (searchEntered.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchEntered)}`);
                setSearchClicked(false);
                setShowSuggestedString(false);
                inputRef.current?.blur();
              }
            }}
          >
            <SearchIcon style={{ color: "white" }}></SearchIcon>
          </IconButton>
        </div>
        {/*Microphone*/}
        <div className="border-1 border-blue-950 rounded-full">
          <IconButton>
            <MicIcon style={{ color: "white" }}></MicIcon>
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
