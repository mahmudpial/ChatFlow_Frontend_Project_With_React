import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";

export default function Contacts() {
    const { contacts, setContacts } = useCRM();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const addContact = () => {
        const cleanName = name.trim();
        const cleanPhone = phone.trim();

        if (!cleanName || !cleanPhone) return;

        const newContact = {
            id: Date.now(),
            name: cleanName,
            phone: cleanPhone,
            messages: [],
            reminders: [],
        };

        // safer state update (avoids race conditions)
        setContacts((prev) => [...prev, newContact]);

        setName("");
        setPhone("");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Contacts
            </h1>

            {/* FORM */}
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

            {/* LIST */}
            <div className="bg-white shadow rounded">
                {contacts.length === 0 ? (
                    <p className="p-4 text-gray-500">
                        No contacts yet
                    </p>
                ) : (
                    contacts.map((c) => (
                        <div
                            key={c.id}
                            onClick={() =>
                                navigate(`/inbox/${c.id}`)
                            }
                            className="p-3 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        >
                            <div>
                                <div className="font-semibold">
                                    {c.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {c.phone}
                                </div>
                            </div>

                            <div className="text-xs text-blue-500">
                                Open →
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}