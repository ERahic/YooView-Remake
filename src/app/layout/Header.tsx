"use client";
import * as React from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuButton from "@mui/icons-material/Menu";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import GoogAuthButton from "../components/Buttons";
import Sidebar from "@/app/layout/SideBar";
// import { signIn } from "next-auth/react"; outdated for this project since Iron-session will be used

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
      <div className="bg-gray-800 z-50 fixed flex w-full pb-4 top-0 justify-between">
        {/*Div below will be for logo*/}
        <div className="left-0 top-0 h-auto w-auto ml-7 mt-5 inline-flex">
          <IconButton onClick={menuExpand}>
            <MenuButton style={{ color: "white" }}></MenuButton>
          </IconButton>
          <div className="flex flex-shrink-0 ml-4">
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
        <div className="flex mt-8 mb-2 mr-10">
          <SearchBar></SearchBar>
        </div>
        <div className="flex gap-6 border-1 border-blue-950 rounded-full mt-4 mr-4 p-1">
          <IconButton>
            <DarkModeIcon style={{ color: "white" }}></DarkModeIcon>
          </IconButton>
          <IconButton>
            <NotificationsIcon style={{ color: "white" }}></NotificationsIcon>
          </IconButton>
          <GoogAuthButton />
        </div>
      </div>
      <Sidebar menuExpand={menuPressed} />
    </>
  );
}

export default Header;
