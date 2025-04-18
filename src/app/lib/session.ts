// Will use Iron Session instead of next-auth due to being more light weight and allowing for more control over what is inside the session and how it will be encrypted
import { SessionOptions } from "iron-session";

// Will have to extend the type of our session just like how it was done in NEXTAUTH in order for session.ts to recognize that iron-session will have an accessToken
// will use interface rather than type due to declaration merging being supported instead of type. Whenever typescript seeing a lot of interface declarations, it will combined them all into one

// Need to include a what if statement outlining that if there is no SESSION_PASSWORD, then an error will be thrown, this will fix sessionOptions from throwing errors for variables such as password since string | undefined cannot be assignable to "password"
if (!process.env.SESSION_SECRET) {
  throw new Error(`Warning! Missing SESSION_PASSWORD in env variables!!!`);
}

// Will need to create a variable called sessionOptions to define what options will be available for sessionOptions
export const sessionOptions: SessionOptions = {
  cookieName: "Yooview_user_cookie",
  password: process.env.SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // The cookie will be sent over to HTTPS only for security reasons
  },
};
