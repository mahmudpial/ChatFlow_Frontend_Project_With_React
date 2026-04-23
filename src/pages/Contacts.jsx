import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCRM } from "../context/useCRM";
import { contactService } from "../services/contactService";

export default function Contacts() {
    const { contacts, setContacts } = useCRM();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(true);

    // 🔄 LOAD CONTACTS FROM API
    useEffect(() => {
        const loadContacts = async () => {
            try {
                const data = await contactService.getAll();
                setContacts(data);
            } catch (error) {
                console.error("Failed to load contacts", error);
            } finally {
                setLoading(false);
            }
        };

        loadContacts();
    }, [setContacts]);

    // ➕ ADD CONTACT (API)
    const addContact = async () => {
        const cleanName = name.trim();
        const cleanPhone = phone.trim();

        if (!cleanName || !cleanPhone) return;

        try {
            const newContact = await contactService.create({
                name: cleanName,
                phone: cleanPhone,
            });

            // update UI instantly
            setContacts((prev) => [...prev, newContact]);

            setName("");
            setPhone("");
        } catch (error) {
            console.error("Failed to create contact", error);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    Contacts
                </h1>

                <div className="flex gap-2">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-sm text-blue-500"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/reminders")}
                        className="text-sm text-yellow-600"
                    >
                        Reminders
                    </button>
                </div>
            </div>

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

                {loading ? (
                    <p className="p-4 text-gray-400">
                        Loading contacts...
                    </p>
                ) : contacts.length === 0 ? (
                    <div className="p-6 text-center">
                        <p className="text-gray-500 mb-2">
                            No contacts yet
                        </p>
                        <p className="text-sm text-gray-400">
                            Add your first customer to start CRM tracking
                        </p>
                    </div>
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