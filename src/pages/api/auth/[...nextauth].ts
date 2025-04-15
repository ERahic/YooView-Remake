// This will be the authenticator handler for this project.
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Will include a check to make sure that clientId and clientSecret do exist before the NextAuth() is called, otherwise, typescript will throw error stating that these variables could also be undefined and not assignable to type string
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw Error(`Warning! Missing Google OAUTH environment variables!`);
}

//Provider Configuration, when writing GoogleProvider, it means using OAUTH 2.0 as the provider for this app
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/youtube.readonly", // just viewing your youtube account
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      //This will save the access token to JWT when the user logs in, if there is an account, it will save the access token into the JWT token
      if (account) {
        token.accessToken = account.access_token; // What this does is it saves the access token in JWT token object
      }
      return token;
    },
    //Send the token to the client session when a session is created
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // Attaches the access token to session, and we call token.accessToken as string to let TS know what we want session to be regarding token access
      return session;
    },
  },
});
