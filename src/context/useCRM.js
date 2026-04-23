import { useContext } from "react";
import { CRMContext } from "./CRMContextProvider";

// Custom hook to use CRM context
export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
}
