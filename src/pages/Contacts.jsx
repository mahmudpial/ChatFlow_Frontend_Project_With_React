import { useState, useEffect } from "react";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);

    // LOAD from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("contacts");
        if (saved) setContacts(JSON.parse(saved));
    }, []);

    // SAVE to localStorage
    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);


    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const addContact = () => {
        if (!name || !phone) return;

        const newContact = {
            id: Date.now(),
            name,
            phone,
        };

        setContacts([...contacts, newContact]);
        setName("");
        setPhone("");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Contacts</h1>

            {/* Form */}
            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 flex-1 rounded"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="border p-2 flex-1 rounded"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button
                    onClick={addContact}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Add
                </button>
            </div>

            {/* List */}
            <div className="bg-white shadow rounded">
                {contacts.length === 0 ? (
                    <p className="p-4 text-gray-500">No contacts yet</p>
                ) : (
                    contacts.map((c) => (
                        <div key={c.id} className="p-3 border-b">
                            <div className="font-semibold">{c.name}</div>
                            <div className="text-sm text-gray-500">{c.phone}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}