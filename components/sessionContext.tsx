/** 
  The purpose of ORTSessionProvider to create a shared state that will store the 
  ONNX Runtime session along with the information about the model that was loaded.
  This is useful because we don't need to create a new inference session every time.
  And model metadata is useful for displaying model properties in the UI.
*/
import { createContext, useContext, useState } from "react";
import { SessionInfo } from "../data/sessionInfo";

const SessionContext = createContext<SessionInfo>(null);

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
