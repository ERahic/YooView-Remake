import * as React from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import SearchBar from "../components/SearchBar";

// Need to add yooview logo onto left side of header, search bar will be in middle as input, right side will hold notification buttons
function Header() {
return (
    <>
    <div className="flex justify-between pb-4">
        {/*Div below will be for logo*/}
        <div className="flex flex-shrink-0 gap-4">
        <Image
            src="/Yooview-logo.png"
            alt="Logo"
            width={300}
            height={300}
            priority
        />
        </div>
        {/*Div below will be for search bar, need to expand and add magnifying glass when clicked on. need microphone button beside search bar*/}
        <div className="flex justify-center mt-5">
        <SearchBar></SearchBar>
        </div>
        <div className="flex items-center justify-end gap-6 border-1 border-blue-950 rounded-full mt-2">
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
