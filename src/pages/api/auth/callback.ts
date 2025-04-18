// When the user has the permissions granted to them. Google will redirect the user back to the homepage but now with an authorization code, this is where we will exchange that code for an accessToken
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../../app/lib/session";

// Need to extend the type of SessionData to accept accessTokens as strings
type SessionData = {
  accessToken?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code: authorizationCode } = req.query; // This will be the authorization code that google provides user

  // Will throw in error in case the authorizationCode is not a string for type efficiency
  if (typeof authorizationCode !== "string") {
    return res.status(400).json({ error: "Authorization code is invalid!" });
  }

  try {
    // If the authorizationCode is a string, we will exchange the code for an accessToken
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      new URLSearchParams(
        {
          code: authorizationCode,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }.toString() // This will form body data as a query string
      )
    );
    // define the access_token variable by extracting data from tokenResponse
    const { access_token } = tokenResponse.data;

    // Will use getIronSession to get the session object
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.accessToken = access_token;
    await session.save();

    // The user will be redirected to the home page after successfully logging in
    res.redirect("/");
  } catch (error) {
    console.error("OAUTH Error", error);
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
}
