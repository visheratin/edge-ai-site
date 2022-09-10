import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export function ORTSessionProvider({ children }) {
  const [session, setSession] = useState(null);
  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}