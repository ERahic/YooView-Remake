import * as React from "react";
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';

// Need to add yooview logo onto left side of header, search bar will be in middle as input, right side will hold notification buttons
function Header() {
    return(
        <>
        <div className="flex justify-between">
        <Image src="/Yooview-logo.png" alt="Logo" width={300} height={300} priority/>
        <div className="flex justify-center mt-5">
            <input type="text" placeholder="Search!" className="border-blue-950 rounded-full w-150 text-start ml-4"/>
        </div>
        <div className="flex items-center justify-end gap-6">
            <IconButton>
                <DarkModeIcon></DarkModeIcon>
            </IconButton>
            <IconButton><NotificationsIcon></NotificationsIcon></IconButton>
            <IconButton><Avatar></Avatar></IconButton>
        </div>
        </div>
        </>
    )
}

export default Header