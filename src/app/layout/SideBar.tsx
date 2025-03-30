import * as React from "react";
import MenuButton from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TheatersIcon from '@mui/icons-material/Theaters';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HistoryIcon from '@mui/icons-material/History';

function Sidebar() {



    return(
        <>
        <div className="fixed left-0 top-0 h-full ml-6 mt-5"><IconButton><MenuButton></MenuButton></IconButton></div>
        <div className="flex-col items-center flex mt-20 ml-5 gap-10">
        <div className="flex flex-col items-center gap-1"><HomeIcon></HomeIcon>Home</div>
        <div className="flex flex-col items-center gap-1"><TheatersIcon></TheatersIcon>Clips</div>
        <div className="flex flex-col items-center gap-1"><AutoAwesomeIcon></AutoAwesomeIcon>Stars</div>
        <div className="flex flex-col items-center gap-1"><EmojiPeopleIcon></EmojiPeopleIcon>You</div>
        <div className="flex flex-col items-center gap-1"><HistoryIcon></HistoryIcon>History</div>
        </div>
        </>
    )
}

export default Sidebar