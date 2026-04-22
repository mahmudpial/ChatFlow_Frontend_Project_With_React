import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCRM } from "../context/CRMContext";

export default function Inbox() {
    const { id } = useParams();
    const { contacts, setContacts } = useCRM();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    // Find current contact
    const contact = contacts.find(
        (c) => c.id === Number(id)
    );

    // Sync messages when contact changes
    useEffect(() => {
        if (contact?.messages) {
            setMessages(contact.messages);
        } else {
            setMessages([]);
        }
    }, [contact]);

    const sendMessage = () => {
        if (!input.trim() || !contact) return;

        const newMsg = {
            id: Date.now(),
            text: input,
            time: new Date().toLocaleTimeString(),
        };

        const updatedContacts = contacts.map((c) => {
            if (c.id === Number(id)) {
                return {
                    ...c,
                    messages: [...(c.messages || []), newMsg],
                };
            }
            return c;
        });

        // update global state
        setContacts(updatedContacts);

        // update UI instantly
        setMessages((prev) => [...prev, newMsg]);

        setInput("");
    };

    if (!contact) {
        return (
            <div className="p-4 text-gray-500">
                Contact not found
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 flex flex-col h-screen">
            {/* HEADER */}
            <div className="border-b pb-2 mb-2">
                <h1 className="text-xl font-bold">
                    {contact.name}
                </h1>
                <p className="text-sm text-gray-500">
                    {contact.phone}
                </p>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto space-y-2 bg-gray-50 p-3 rounded border">
                {messages.length === 0 ? (
                    <p className="text-gray-400">
                        No messages yet
                    </p>
                ) : (
                    messages.map((m) => (
                        <div
                            key={m.id}
                            className="bg-white p-2 rounded shadow"
                        >
                            <div>{m.text}</div>
                            <div className="text-xs text-gray-400">
                                {m.time}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* INPUT */}
            <div className="flex mt-3 gap-2">
                <input
                    className="border flex-1 p-2 rounded"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}