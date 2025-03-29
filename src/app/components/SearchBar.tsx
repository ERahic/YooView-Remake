// need to handle state for when user clicks on search bar
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

// by default, the search bar is not focused on until clicked on

function SearchBar() {
    const [searchClicked, setSearchClicked] = useState(false);


    return(
        <>
        <div className="flex">
        <input type="text" placeholder="Search!" className="border-1 border-blue-500 rounded-full w-150 text-start pl-4" />
                <div className="border-blue-950 rounded-full">
                    <IconButton><SearchIcon></SearchIcon></IconButton>
                </div>
                <div className="pl-4"><IconButton><MicIcon></MicIcon></IconButton></div>
        </div>
        </>
    )
}

export default SearchBar