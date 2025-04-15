"use client"; // If I dont mark this file as a client component, it will break
// must import SessionProvider in order for OAUTH to be used for the entire app, not just a specific page/component
import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper = ({
  children,
}: {
  children: React.ReactNode; //children prop can be anything that react can render and to help type children in components
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
