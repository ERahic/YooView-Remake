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
import { useRouter } from "next/navigation";
import MobileNavigation from "./MobileSideBar";
import SideBar from "@/app/layout/SideBar";

// import { signIn } from "next-auth/react"; outdated for this project since Iron-session will be used

type HeaderProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
  menuPressed: boolean;
  setMenuPressed: React.Dispatch<React.SetStateAction<boolean>>;
};

// USE OAUTH FOR LOGIN IN THE FUTURE
// Need to add yooview logo onto left side of header, search bar will be in middle as input, right side will hold notification buttons
function Header({
  onSearch,
  searchQuery,
  menuPressed,
  setMenuPressed,
}: HeaderProps) {
  // Will make both YooView logo clickable and have user be redirected to home page like on YouTube
  const router = useRouter();

  // UseState for when the menu button is pressed, sidebar will expand and provide more options
  // const [menuPressed, setMenuPressed] = useState<boolean>(false);
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
      {/*Div Wrap*/}
      <div className="bg-gray-800 z-50 fixed flex w-full h-24 pb-4 top-0 justify-between items-center">
        <div className="relative w-full flex items-center justify-between">
          {/*Div below will be for logo and menu button*/}
          <div className="flex items-center flex-shrink-0">
            {/*Menu Expand Button for desktop*/}
            <div className="hidden sm:flex mt-5 ml-7">
              <IconButton onClick={menuExpand}>
                <MenuButton style={{ color: "white" }}></MenuButton>
              </IconButton>
            </div>
            <div
              className="flex flex-shrink-0 cursor-pointer transition-all duration-100 hover:drop-shadow-[0_0_10px_rgba(0,100,150,1)] sm:ml-4"
              onClick={() => {
                router.push("/");
                onSearch("");
              }}
            >
              {/*YooView Logo */}
              <div className="z-50 cursor-pointer flex flex-col flex-shrink-0 justify-center sm:ml-4 mt-2">
                <Image
                  src="/Yooview-logo-dark.png"
                  alt="Logo"
                  width={300}
                  height={300}
                  priority
                />
              </div>
              {/*Mobile MenuExpand Button*/}
              <div className="absolute top-23 z-50 left-3 sm:hidden ml-4 transition-all duration-500">
                <IconButton onClick={menuExpand}>
                  <MenuButton className="text-white z-50" />
                </IconButton>
              </div>
              <div
                className={`fixed top-16 left-0 z-40 w-64 h-[calc(100%-5rem)] bg-gray-800 transition-transform duration-500 caret-transparent ${
                  menuPressed ? "translate-x-0" : "-translate-x-full"
                } sm:hidden`}
              >
                <SideBar
                  menuExpand={true}
                  // setMenuExpand={setMenuPressed}
                  onSearch={onSearch}
                  searchQuery={searchQuery}
                  //variant="mobile"
                />
              </div>
            </div>
          </div>

          {/*Div Wrapper for searchbar and greeting */}
          <div className="flex-grow flex items-center pl-50">
            {/*Div below will be for search bar, need to expand and add magnifying glass when clicked on. need microphone button beside search bar*/}
            <div className="hidden sm:flex justify-center w-full">
              <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
            </div>
            <div className="hidden sm:mt-5 text-4xl">
              {user && (
                <div className="text-white font-bold whitespace-nowrap select-none">
                  Welcome, {user.name ? ` ${user.name.split(" ")[0]}` : ""}!
                </div>
              )}
            </div>

            {/*Wrapper for dark mode, notification bell, profile */}
            <div className="hidden sm:flex items-center gap-4 pr-20 p-1 mt-5">
              <IconButton>
                <DarkModeIcon style={{ color: "white" }}></DarkModeIcon>
              </IconButton>
              <IconButton>
                <NotificationsIcon
                  style={{ color: "white" }}
                ></NotificationsIcon>
              </IconButton>
              <div className="absolute right-3 top-3 z-50">
                <GoogAuthButton />
              </div>
            </div>
          </div>
        </div>
        {/*Mobile AuthButton and maybe search Icon if I can get it to work on mobile screen*/}
        <div className="sm:hidden absolute right-3 top-3 z-50">
          <GoogAuthButton />
        </div>
        {/*Wrapper for sidebar component, need to have it hidden when app is loaded on mobile */}
        <div className="hidden sm:block">
          <Sidebar
            menuExpand={menuPressed}
            // setMenuExpand={setMenuPressed}
            onSearch={onSearch}
            searchQuery={searchQuery}
            //variant="desktop"
          />
        </div>
        {/*Nav Bar placed at the bottom when screen is in mobile mode*/}
        <div className="sm:hidden">
          <MobileNavigation onSearch={onSearch} />
        </div>
      </div>
    </>
  );
}

export default Header;
