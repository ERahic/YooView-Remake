import * as React from "react";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TheatersIcon from "@mui/icons-material/Theaters";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HistoryIcon from "@mui/icons-material/History";
import clsx from "clsx";

function Sidebar() {
  return (
    <>
      <div className="fixed left-0 h-full top-24 w-20 p-4 pl-4 debug bg-gray-800">
        <div className="items-center flex flex-col gap-12">
          <div>
            <HomeIcon className="ml-2"></HomeIcon>Home
          </div>
          <div>
            <TheatersIcon className="ml-2"></TheatersIcon>Clips
          </div>
          <div>
            <AutoAwesomeIcon className="ml-2"></AutoAwesomeIcon>Stars
          </div>
          <div>
            <EmojiPeopleIcon className="ml-2"></EmojiPeopleIcon>You
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
