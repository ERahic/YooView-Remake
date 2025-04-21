// Button for both login and logout
// Will have to use useState and useEffect to remember when user is logged in or not
import { useEffect, useState } from "react";

export default function GoogAuthButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  // need to make useState either boolean or provide null if theres nothing
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  //Check the session status for user
  useEffect(() => {
    fetch("api/lib/session")
      .then((res) => res.json()) // Parses the json body from the response in order to access the accessToken
      .then((data) => {
        setLoggedIn(!!data.accessToken); // "!!" is used to convert a value into a true boolean
      });
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
      {children ??
        (loggedIn === null ? "Please wait" : loggedIn ? "Logout" : "Login")}
    </div>
  );
}
