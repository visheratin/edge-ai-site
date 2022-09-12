import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { SessionInfo } from "../data/sessionInfo";

const defaultState: SessionInfo = {
  meta: {
    classes: []
  }
};

const SessionContext = createContext<SessionInfo>(defaultState);

export function ORTSessionProvider({ children }) {
  const [session, setSession] = useState(null);
  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext(): SessionInfo {
  return useContext(SessionContext);
}