import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TheatersIcon from "@mui/icons-material/Theaters";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

// Need to pass menuExpand from header to sidebar as prop in order for menu expansion to work
type SidebarProps = {
  menuExpand: boolean;
};

function Sidebar({ menuExpand }: SidebarProps) {
  console.log("sidebar expanded", menuExpand);
  return (
    <>
      <div
        className="fixed left-0 h-full top-24 p-4 pl-4 transition-all duration-500 bg-gray-800 rounded-lg overflow-hidden caret-transparent"
        style={{ width: menuExpand ? "20rem" : "6rem" }} // Have to use style due to tailwind
      >
        <div className="flex flex-col items-center gap-20 text-center">
          <div className="flex flex-col items-center gap-2">
            <HomeIcon style={{ color: "white" }}></HomeIcon>
            Home
          </div>
          <div className="flex flex-col items-center gap-2">
            <TheatersIcon style={{ color: "white" }}></TheatersIcon>
            Clips
          </div>
          <div className="flex flex-col items-center gap-2">
            <AutoAwesomeIcon style={{ color: "white" }}></AutoAwesomeIcon>
            Stars
          </div>
          <div className="flex flex-col items-center gap-2">
            <EmojiPeopleIcon style={{ color: "white" }}></EmojiPeopleIcon>
            You
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
