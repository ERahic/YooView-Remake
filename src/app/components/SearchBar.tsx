// need to handle state for when user clicks on search bar
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
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

  // Another useState but for tracking what user has entered in search and youtube api will fetch videos related to searched input
  const [searchEntered, setSearchEntered] = useState<string>("");

  // Use effect to reset the input whenever the page refreshes via click on logo or home icon
  useEffect(() => {
    setSearchEntered(searchQuery);
  }, [searchQuery]);

  // use clsx and useState to make search bar expand a bit when clicked on,
  return (
    <>
      <div className="flex gap-2 pl-24">
        {/*Search Bar*/}
        {/*Magnifying glass appears when searchbar is clicked on*/}
        <div className="relative flex">
          {searchClicked && (
            <SearchIcon className="absolute mt-2.5 ml-4 text-gray-500"></SearchIcon>
          )}
          {/*In order to have useStates for searched & setSearched, need to use onChange and onKeyDown for when user types anything in searchbar and will get automatically updated*/}
          <input
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
            onFocus={() => setSearchClicked(true)}
            onBlur={() => setSearchClicked(false)}
            onChange={(e) => setSearchEntered(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(searchEntered);
                console.log(`Entered: ${searchEntered}`);
              }
            }}
          />
        </div>
        <div className="border-1 border-blue-950 rounded-full">
          <IconButton>
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
