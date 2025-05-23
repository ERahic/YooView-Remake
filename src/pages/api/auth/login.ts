//This file will be responsible for handling the login process via Google OAUTH
// Axios will be imported in order to make HTTP request to exernal services (Google OAUTH)
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fallbacks to have it work for both localhost and vercel
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
    const redirectUri = `${baseUrl}/api/auth/callback`;

    const googleAuthUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      new URLSearchParams({
        // What this does is it redirects the user to Google's OAUTH consent page
        response_type: "code", // This will tell google to issue an authorization code for the user and if its not a code, an error will appear after it fails
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        redirect_uri: redirectUri,
        // redirect_uri: process.env.GOOGLE_REDIRECT_URI ?? "", // using ?? will only check for null or undefined, it wont check for other falsy values such as 0, false, "", etc
        scope: [
          "openid",
          "email",
          "profile",
          "https://www.googleapis.com/auth/youtube.readonly",
        ].join(" "),
        access_type: "offline",
        prompt: "consent",
      }).toString();

    res.redirect(googleAuthUrl);
  } else {
    res.status(405).send("Method not allowed");
  }
}
