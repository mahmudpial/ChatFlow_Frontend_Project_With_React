import { createContext, useContext, useEffect, useState } from "react";
import { contactService } from "../services/contactService";

const CRMContext = createContext();

export function CRMProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 LOAD FROM API (NOT localStorage)
  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAll();
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // load once
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await contactService.getAll();
        setContacts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load contacts:", error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <CRMContext.Provider
      value={{
        contacts,
        setContacts,
        loading,
        reloadContacts: loadContacts, // 🔥 important
      }}
    >
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  return useContext(CRMContext);
}
