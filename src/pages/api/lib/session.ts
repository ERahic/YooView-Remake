// Will use Iron Session instead of next-auth due to being more light weight and allowing for more control over what is inside the session and how it will be encrypted
import { SessionOptions } from "iron-session";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

// Will have to extend the type of our session just like how it was done in NEXTAUTH in order for session.ts to recognize that iron-session will have an accessToken
// will use interface rather than type due to declaration merging being supported instead of type. Whenever typescript seeing a lot of interface declarations, it will combined them all into one

//User needs to be defined by what type each prop will be for putting info up on user for front end
export interface User {
  name: string;
  email: string;
  picture: string;
}

// Need to extend the interface of SessionData to accept accessTokens as strings
export interface SessionData {
  accessToken?: string;
  user?: User;
}

// Need to include a what if statement outlining that if there is no SESSION_PASSWORD, then an error will be thrown, this will fix sessionOptions from throwing errors for variables such as password since string | undefined cannot be assignable to "password"
if (!process.env.SESSION_SECRET) {
  throw new Error(`Warning! Missing SESSION_PASSWORD in env variables!!!`);
}

// Need to extend IronSessionsData interface to include not only accessToken but User info as well in order to prevent type errors from occuring
declare module "iron-session" {
  interface IronSessionData extends SessionData {
    accessToken?: string;
    user: {
      name: string;
      email: string;
      picture: string;
    };
  }
}

// Will need to create a variable called sessionOptions to define what options will be available for sessionOptions
export const sessionOptions: SessionOptions = {
  cookieName: "Yooview_user_cookie",
  password: process.env.SESSION_SECRET!, // Added "!" for sessionOptions to avoid typescript giving an error
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // The cookie will be sent over to HTTPS only for security reasons
  },
};

// This will check if the user is logged in, they will have the accessToken, null if not logged in
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  res.status(200).json({
    accessToken: session.accessToken ?? null,
    user: session.user ?? null,
  });
  // pass the session data (name, email, avatar, etc) for front end
}
