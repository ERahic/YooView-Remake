// need to handle state for when user clicks on search bar
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import clsx from "clsx";

// by default, the search bar is not focused on until clicked on

function SearchBar() {
  // const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

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
          <input
            type="text"
            placeholder="Search!"
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
