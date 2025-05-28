// A refresh access token helper to handle the google OAUTH refresh process in order to prevent google's error 403 from occuring.

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Refresh Token Error:", data.error);
      return null;
    }

    console.log("Refreshed AccessToken:", data.access_token);
    return data;
  } catch (error) {
    console.error("Failed to refresdh access token", error);
    return null;
  }
}
