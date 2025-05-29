"use client";
import { sideBarIcons } from "./SideBar";
import { useRouter } from "next/navigation";

// In order to get bottom nav to work on mobile version without left sidebar appearing too, a seperate file containing the mobile nav is necessary for tailwind to not get confused
function MobileNavigation({ onSearch }: { onSearch: (query: string) => void }) {
  const router = useRouter();

  return (
    <div className="fixed flex justify-around items-center border-t border-gray-700 sm:hidden bottom-0 left-0 w-full h-16 z-50 bg-gray-900 text-white">
      {sideBarIcons
        .filter((item) => item.alwaysVisible)
        .map(({ id, icon: Icon, label, path }) => (
          <button
            key={id}
            onClick={() => {
              if (label === "Home") {
                router.push("/");
                onSearch("");
              } else if (typeof path === "string") {
                router.push(path);
              }
            }}
            className="flex flex-row items-center gap-0.5"
          >
            <Icon style={{ fontSize: 24 }} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
    </div>
  );
}

export default MobileNavigation;
