// When the user has the permissions granted to them. Google will redirect the user back to the homepage but now with an authorization code, this is where we will exchange that code for an accessToken
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/session";
import type { SessionData } from "@/pages/api/lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fallbacks to have it work for both localhost and vercel
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const redirectUri = `${baseUrl}/api/auth/callback`;
  const { code: authorizationCode } = req.query; // This will be the authorization code that google provides user

  // Will throw in error in case the authorizationCode is not a string for type efficiency
  if (typeof authorizationCode !== "string") {
    return res.status(400).json({ error: "Authorization code is invalid!" });
  }

  try {
    // If the authorizationCode is a string, we will exchange the code for an accessToken
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      new URLSearchParams({
        code: authorizationCode,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      // Headers was added to make absolute sure that Google will accept the requested format
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // define the access_token variable by extracting data from tokenResponse
    const { access_token } = tokenResponse.data;

    // The access will now let us get the users profile
    const userInfoRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // Will use getIronSession to get the session object
    const user = userInfoRes.data;
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.accessToken = access_token;
    session.user = {
      name: user.name,
      email: user.email,
      picture: user.picture,
    };
    await session.save();

    console.log(`Session After Login:`, session);
    // The user will be redirected to the home page after successfully logging in
    res.redirect("/");
  } catch (error) {
    console.error("OAUTH Error", error);
    if (axios.isAxiosError(error)) {
      console.error("Google token response error:", error.response?.data); // will explain exactly why google is rejecting the token exchange
    }
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
}
