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

// Need to pass menuExpand from header to sidebar as prop in order for menu expansion to work
type SidebarProps = {
  menuExpand?: boolean; // putting a question mark will make this more optional
  onSearch: (query: string) => void;
  searchQuery: string; // for synching
};

// Creating an array of sidebar icons that will include icons that only appear when sidebar is expanded, easier setup then to manually put each icon into its own div
const sideBarIcons = [
  { id: 1, icon: HomeIcon, label: "Home", alwaysVisible: true, path: "/" },
  { id: 2, icon: TheatersIcon, label: "Clips", alwaysVisible: true },
  { id: 3, icon: SatelliteAltIcon, label: "Explore", alwaysVisible: true },
  { id: 4, icon: AutoAwesomeIcon, label: "Stars", alwaysVisible: true },
  { id: 5, icon: EmojiPeopleIcon, label: "You", alwaysVisible: true },
  { id: 6, icon: FingerprintIcon, label: "Posts", alwaysVisible: false },
  { id: 7, icon: SettingsIcon, label: "Settings", alwaysVisible: false },
  { id: 8, icon: PhotoCameraIcon, label: "Upload", alwaysVisible: false },
  { id: 9, icon: SecurityIcon, label: "Rules & Safety", alwaysVisible: false },
  { id: 10, icon: BugReportIcon, label: "Report Bugs", alwaysVisible: false },
  { id: 11, icon: CoffeeIcon, label: "Coffee", alwaysVisible: false },
];

function Sidebar({ menuExpand = false, onSearch }: SidebarProps) {
  console.log("sidebar expanded", menuExpand);

  //Make home button on sidebar redirect user to homepage when clicked
  const router = useRouter();

  // Creating a variable that will map each sidebar option and have the extras appear on condition that menu expanded is true
  const sideBarList = sideBarIcons.map(
    ({ id, icon: Icon, label, alwaysVisible, path }) => {
      if (!menuExpand && !alwaysVisible) return null;

      // handleClick variable for icons that hold a path variable and will act if there is
      const handleClick = () => {
        if (label === "Home") {
          router.push("/");
          onSearch(""); // reset the search query and revert to popular videos
        } else if (typeof path === "string") {
          console.log(`Redirecting to ${path}`);
          router.push(path);
        }
      };

      return (
        <div
          key={id}
          onClick={handleClick}
          className={`flex items-center text-white mt-10 ${
            menuExpand
              ? "flex-row justify-start pl-4 gap-6 text-lg"
              : "flex-col"
          } hover: cursor-pointer`}
        >
          <Icon style={{ color: "white", fontSize: menuExpand ? 40 : 30 }} />
          <span
            className={`text-white text-md ${
              menuExpand ? "" : "text-[20px] mt-2"
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
      <div
        className="fixed flex z-40 flex-col left-0 h-full top-24 p-4 pl-4 transition-all duration-500 bg-gray-800 rounded-lg overflow-hidden caret-transparent"
        style={{ width: menuExpand ? "16rem" : "6rem" }} // Have to use style due to tailwind
      >
        {sideBarList}
      </div>
    </>
  );
}

export default Sidebar;
