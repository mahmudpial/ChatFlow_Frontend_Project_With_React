import { useCallback, useState } from "react";
import { contactService } from "../services/contactService";
import { CRMContext } from "./CRMContextProvider";

export function CRMProvider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🚀 LOAD FROM API (NOT localStorage)
    const loadContacts = useCallback(async () => {
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
    }, []);

    return (
        <CRMContext.Provider
            value={{
                contacts,
                setContacts,
                loading,
                reloadContacts: loadContacts, // 🔥 explicit load on demand
            }}
        >
            {children}
        </CRMContext.Provider>
    );
}

