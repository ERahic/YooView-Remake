// need to handle state for when user clicks on search bar
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import clsx from 'clsx';

// by default, the search bar is not focused on until clicked on

function SearchBar() {
    // const [searchClicked, setSearchClicked] = useState<boolean>(false);
    const [searchClicked, setSearchClicked] = useState<boolean>(false);

    // use clsx and useState to make search bar expand a bit when clicked on, 
    return(
        <>
        <div className="flex gap-2">
        {/*Search Bar*/}
        <input type="text" placeholder="Search!" className={clsx("border-1 border-blue-950 rounded-full w-150 text-start pl-4")}/>
                <div className="border-1 border-blue-950 rounded-full">
                    <IconButton><SearchIcon></SearchIcon></IconButton>
                </div>
                {/*Microphone*/}
                <div className="border-1 border-blue-950 rounded-full">
                    <IconButton><MicIcon></MicIcon></IconButton>
                </div>
        </div>
        </>
    )
}

export default SearchBar