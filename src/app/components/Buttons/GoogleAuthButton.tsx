// Button for both login and logout
// Will have to use useState and useEffect to remember when user is logged in or not
import { useEffect, useState } from "react";
import { User } from "@/pages/api/lib/session";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";

export default function GoogAuthButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  // need to make useState either boolean or provide null if theres nothing
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  // useState to check if the user is logged in
  const [user, setUser] = useState<User | null>(null);
  // UseEffect used to store the Users info in order to display name, email and profile avatar
  useEffect(() => {
    fetch("/api/lib/session").then(
      (
        res // Parses the json body from the response in order to access the accessToken
      ) =>
        res.json().then((data) => {
          setLoggedIn(!!data.accessToken); // "!!" is used to convert a value into a true boolean
          setUser(data.user ?? null);
          console.log("User Picture URL:", data.user?.picture);
        })
    );
  }, []);

  // Handleclick will take user to either login or logout page depending on user having accessToken
  const handleClick = () => {
    if (loggedIn) {
      window.location.href = "/api/auth/logout";
    } else {
      window.location.href = "/api/auth/login";
    }
  };

  return (
    <div onClick={handleClick}>
      {children ?? (
        <IconButton aria-label="Sign In">
          {user?.picture ? ( // If the user logs in and has their own avatar, it will replace the default MUI version
            <Image
              src={user.picture}
              alt="User Avatar"
              className="rounded-full object-cover"
              width={40}
              height={40}
            />
          ) : (
            <Avatar />
          )}
        </IconButton>
      )}
    </div>
  );
}
