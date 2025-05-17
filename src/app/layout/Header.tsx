"use client";
import * as React from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuButton from "@mui/icons-material/Menu";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import GoogAuthButton from "../components/Buttons/GoogleAuthButton";
import Sidebar from "@/app/layout/SideBar";
import { User } from "@/pages/api/lib/session";
// import { signIn } from "next-auth/react"; outdated for this project since Iron-session will be used

// USE OAUTH FOR LOGIN IN THE FUTURE
// Need to add yooview logo onto left side of header, search bar will be in middle as input, right side will hold notification buttons
function Header() {
  // UseState for when the menu button is pressed, sidebar will expand and provide more options
  const [menuPressed, setMenuPressed] = useState<boolean>(false);
  const menuExpand = () => {
    setMenuPressed(!menuPressed);
  };

  // useState for when user is logged in, they will be greeted by their name
  const [user, setUser] = useState<User | null>(null);

  // useEffect for immediately fetching the users name in order to display it when page loads after login
  useEffect(() => {
    fetch("/api/lib/session")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
      });
  }, []); // add empty array [] or else useEffect will be constantly active
  return (
    <>
      <div className="bg-blue-950 z-50 fixed flex w-full pb-4 top-0 justify-between items-center">
        {/*Div below will be for logo and menu button*/}
        <div className="flex mt-5 ml-6 items-center">
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

        {/*Div Wrapper for searchbar and greeting */}
        <div className="flex items-center gap-6">
          {/*Div below will be for search bar, need to expand and add magnifying glass when clicked on. need microphone button beside search bar*/}
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-6">
            <SearchBar></SearchBar>
          </div>
          <div className="mt-5 mr-50 text-4xl">
            {user && (
              <div className="text-white font-bold whitespace-nowrap select-none">
                Welcome, {user.name ? ` ${user.name.split(" ")[0]}` : ""}!
              </div>
            )}
          </div>
          {/*Wrapper for dark mode, notification bell, profile */}
          <div className="flex items-center gap-6 mr-8 p-1 mt-5">
            <IconButton>
              <DarkModeIcon style={{ color: "white" }}></DarkModeIcon>
            </IconButton>
            <IconButton>
              <NotificationsIcon style={{ color: "white" }}></NotificationsIcon>
            </IconButton>
            <GoogAuthButton />
          </div>
        </div>
      </div>
      <Sidebar menuExpand={menuPressed} />
    </>
  );
}

export default Header;
