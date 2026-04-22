import { createContext, useContext, useEffect, useState } from "react";

const CRMContext = createContext();

export function CRMProvider({ children }) {
    const [contacts, setContacts] = useState([]);

    // Load once
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("contacts")) || [];
        setContacts(data);
    }, []);

    // Save whenever contacts change
    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    return (
        <CRMContext.Provider value={{ contacts, setContacts }}>
            {children}
        </CRMContext.Provider>
    );
}

export function useCRM() {
    return useContext(CRMContext);
}