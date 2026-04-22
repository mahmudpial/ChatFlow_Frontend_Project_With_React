import { createContext, useContext, useEffect, useState } from "react";

const CRMContext = createContext();

export function CRMProvider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load once (safe version)
    useEffect(() => {
        try {
            const data = localStorage.getItem("contacts");

            if (data) {
                const parsed = JSON.parse(data);
                setContacts(Array.isArray(parsed) ? parsed : []);
            }
        } catch (error) {
            console.error("Failed to load contacts:", error);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save whenever contacts change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem(
                "contacts",
                JSON.stringify(contacts)
            );
        }
    }, [contacts, loading]);

    return (
        <CRMContext.Provider
            value={{
                contacts,
                setContacts,
                loading,
            }}
        >
            {children}
        </CRMContext.Provider>
    );
}

export function useCRM() {
    return useContext(CRMContext);
}