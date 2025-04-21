// When user logs in and retrieves an access token, user should be able to log out by pressing the same button used to log in
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/lib/session";
import { SessionData } from "@/app/lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Getting the session via iron-session
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  // accessToken will be destroyed when user logs out
  session.destroy();

  // Redirect user back to homepage when logging out
  res.redirect("/");
}
