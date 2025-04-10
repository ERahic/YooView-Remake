// This exists to extend the session type definition so that [...nextauth].ts can recognize that session has an accessToken property
// Next-auth does not have an accessToken property which is why this is needed
import NextAuth from "next-auth";

// Use declare module to change an existing module (i.e. next-auth) and extend next-auth's type
// Will use interface instead of type to make extra definitions of next-auth due to 3 reasons. 1: can be merged 2: be able to extend third party types like session 3: more preferrable for declare module
export declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// Using type wont work for this apparently because it wont make changes to the original type from next-auth package that was installed for this project
