"use client";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TheatersIcon from "@mui/icons-material/Theaters";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SettingsIcon from "@mui/icons-material/Settings";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";

// Need to pass menuExpand from header to sidebar as prop in order for menu expansion to work
type SidebarProps = {
  menuExpand?: boolean; // putting a question mark will make this more optional
  setMenuExpand?: (state: boolean) => void;
  onSearch: (query: string) => void;
  searchQuery: string; // for synching
  //variant?: "mobile" | "desktop"; // to help distinguish which sidebar should be used depending on whether the user is on mobile or desktop
};

// Creating an array of sidebar icons that will include icons that only appear when sidebar is expanded, easier setup then to manually put each icon into its own div
export const sideBarIcons = [
  { id: 1, icon: HomeIcon, label: "Home", alwaysVisible: true, path: "/" },
  {
    id: 2,
    icon: TheatersIcon,
    label: "Clips",
    alwaysVisible: true,
    path: "/coming-soon",
  },
  {
    id: 3,
    icon: SatelliteAltIcon,
    label: "Explore",
    alwaysVisible: true,
    path: "/coming-soon",
  },
  {
    id: 4,
    icon: AutoAwesomeIcon,
    label: "Stars",
    alwaysVisible: true,
    path: "/coming-soon",
  },
  {
    id: 5,
    icon: EmojiPeopleIcon,
    label: "You",
    alwaysVisible: true,
    path: "/coming-soon",
  },
  {
    id: 6,
    icon: FingerprintIcon,
    label: "Posts",
    alwaysVisible: false,
    path: "/coming-soon",
  },
  {
    id: 7,
    icon: SettingsIcon,
    label: "Settings",
    alwaysVisible: false,
    path: "/coming-soon",
  },
  {
    id: 8,
    icon: PhotoCameraIcon,
    label: "Upload",
    alwaysVisible: false,
    path: "/coming-soon",
  },
  {
    id: 9,
    icon: SecurityIcon,
    label: "Rules & Safety",
    alwaysVisible: false,
    path: "/coming-soon",
  },
  {
    id: 10,
    icon: BugReportIcon,
    label: "Report Bugs",
    alwaysVisible: false,
    path: "/coming-soon",
  },
  {
    id: 11,
    icon: CoffeeIcon,
    label: "Coffee",
    alwaysVisible: false,
    path: "/coming-soon",
  },
];

function Sidebar({
  menuExpand = false,
  setMenuExpand,
  onSearch,
}: //variant = "desktop",
SidebarProps) {
  console.log("sidebar expanded", menuExpand);

  //Make home button on sidebar redirect user to homepage when clicked
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile && !menuExpand) return null;

  // Creating a variable that will map each sidebar option and have the extras appear on condition that menu expanded is true
  const sideBarList = sideBarIcons.map(
    ({ id, icon: Icon, label, alwaysVisible, path }, index) => {
      if (!menuExpand && !alwaysVisible) return null;

      // handleClick variable for icons that hold a path variable and will act if there is
      const handleClick = () => {
        console.log(`Clicked ${label}, path: ${path}`);
        if (label === "Home") {
          router.push("/");
          onSearch(""); // reset the search query and revert to popular videos
        } else if (typeof path === "string") {
          console.log(`Redirecting to ${path}`);
          router.push(path);
        }
        if (isMobile && setMenuExpand) {
          setTimeout(() => setMenuExpand(false), 200);
        }

        //   //Auto close mobile menu after selection
        //   if (isMobile && setMenuExpand) {
        //     setMenuExpand(false);
        //   }
        //   console.log("Clicked:", label); //"Variant:", variant);
      };

      const isFirstIcon = index === 0;
      const iconMargin = isFirstIcon ? (isMobile ? "mt-0" : "mt-10") : "mt-6";

      return (
        <div
          key={id}
          onClick={handleClick}
          className={`flex items-center text-white ${iconMargin} ${
            menuExpand
              ? isMobile
                ? "gap-3 pl-3 text-base"
                : "flex-row justify-start pl-4 gap-6 text-lg"
              : "flex-col"
          } hover: cursor-pointer`}
        >
          <Icon
            style={{
              color: "white",
              fontSize: isMobile ? 30 : menuExpand ? 40 : 30,
            }}
          />
          <span
            className={`text-white text-md ${
              menuExpand
                ? isMobile
                  ? "text-sm"
                  : "text-base"
                : "text-[20px] mt-2"
            }`}
          >
            {label}
          </span>
        </div>
      );
    }
  );

  return (
    <>
      {/*For Desktop*/}
      <div
        className={`fixed z-40 flex flex-col bg-gray-800 caret-transparent transition-all duration-500 overflow-hidden
          ${
            isMobile
              ? "top-24 left-0 h-full w-64 p-4"
              : "top-20 left-0 h-full w-24 pt-12"
          }`}
        style={!isMobile ? { width: menuExpand ? "16rem" : "6rem" } : {}}
      >
        <div className="flex flex-col space-y-1">{sideBarList}</div>
      </div>
    </>
  );
}

export default Sidebar;
