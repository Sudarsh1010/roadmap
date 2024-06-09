"use client";

import type { Session, User } from "lucia";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

interface SessionProviderProps {
  user: User | null;
  session: Session | null;
}

const SessionContext = createContext<SessionProviderProps>(
  {} as SessionProviderProps,
);

const SessionProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SessionProviderProps;
}) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

const useSession = () => {
  const sessionContext = useContext(SessionContext);
  if (!sessionContext)
    throw new Error("useSession must be used within SessionProvider");
  return sessionContext;
};

export { SessionProvider, useSession };
