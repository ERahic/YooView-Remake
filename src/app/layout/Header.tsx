import * as React from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import MenuButton from "@mui/icons-material/Menu";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

// USE OAUTH FOR LOGIN IN THE FUTURE
// Need to add yooview logo onto left side of header, search bar will be in middle as input, right side will hold notification buttons
function Header() {
  // UseState for when the menu button is pressed, sidebar will expand and provide more options
  const [menuPressed, setMenuPressed] = useState<boolean>(false);
  const menuExpand = () => {
    setMenuPressed(!menuPressed);
  };

  return (
    <>
      <div className="bg-gray-800 z-50 fixed flex w-full pb-4 debug justify-between">
        {/*Div below will be for logo*/}
        <div className="left-0 top-0 h-auto w-auto ml-6 mt-5 debug inline-flex">
          <IconButton onClick={menuExpand}>
            <MenuButton></MenuButton>
          </IconButton>
          <div className="flex flex-shrink-0">
            <Image
              src="/Yooview-logo.png"
              alt="Logo"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
        {/*Div below will be for search bar, need to expand and add magnifying glass when clicked on. need microphone button beside search bar*/}
        <div className="flex mt-8 mb-2">
          <SearchBar></SearchBar>
        </div>
        <div className="flex gap-6 border-1 border-blue-950 rounded-full mt-2">
          <IconButton>
            <DarkModeIcon></DarkModeIcon>
          </IconButton>
          <IconButton>
            <NotificationsIcon></NotificationsIcon>
          </IconButton>
          <IconButton>
            <Avatar></Avatar>
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Header;
