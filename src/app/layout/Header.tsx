import react from "react";
import Image from "next/image";


// Need to add yooview logo onto left side of header, search bar will be in middle as input, right side will hold notification buttons
function Header() {
    return(
        <>
        <div className="flex justify-between">
        <Image src="/Yooview-logo.png" alt="Logo" width={300} height={300} priority></Image>
        <div className="justify-center">Search Bar</div>
        <div className="justify-end">Notifications</div>
        </div>
        </>
    )
}

export default Header