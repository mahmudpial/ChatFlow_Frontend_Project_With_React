import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCRM } from "../context/useCRM";
import { messageService } from "../services/messageService";
import { reminderService } from "../services/reminderService";

export default function Inbox() {
    const { id } = useParams();
    const { contacts, setContacts, loading } = useCRM();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [reminderText, setReminderText] = useState("");
    const [reminderDate, setReminderDate] = useState("");

    const contact = contacts?.find(
        (c) => c.id === Number(id)
    );

    useEffect(() => {
        const loadMessages = async () => {
            if (contact?.messages) {
                setMessages(contact.messages);
            } else {
                setMessages([]);
            }
        };
        loadMessages();
    }, [contact]);

    if (loading) {
        return <div className="p-4 text-gray-500">Loading inbox...</div>;
    }

    if (!contact) {
        return <div className="p-4 text-gray-500">Contact not found</div>;
    }

    // 🚀 SEND MESSAGE (API)
    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            const newMsg = await messageService.send({
                contact_id: contact.id,
                text: input,
            });

            // update global state
            const updatedContacts = contacts.map((c) => {
                if (c.id === contact.id) {
                    return {
                        ...c,
                        messages: [...(c.messages || []), newMsg],
                    };
                }
                return c;
            });

            setContacts(updatedContacts);
            setMessages((prev) => [...prev, newMsg]);
            setInput("");
        } catch (err) {
            console.error("Send message failed", err);
        }
    };

    // 🔔 ADD REMINDER (API)
    const addReminder = async () => {
        if (!reminderText.trim() || !reminderDate) return;

        try {
            const newReminder = await reminderService.create({
                contact_id: contact.id,
                text: reminderText,
                date: reminderDate,
            });

            const updatedContacts = contacts.map((c) => {
                if (c.id === contact.id) {
                    return {
                        ...c,
                        reminders: [
                            ...(c.reminders || []),
                            newReminder,
                        ],
                    };
                }
                return c;
            });

            setContacts(updatedContacts);

            setReminderText("");
            setReminderDate("");
        } catch (err) {
            console.error("Add reminder failed", err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 flex flex-col h-screen">

            {/* HEADER */}
            <div className="border-b pb-2 mb-2">
                <h1 className="text-xl font-bold">{contact.name}</h1>
                <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>

            {/* REMINDER */}
            <div className="border p-3 rounded mb-3 bg-yellow-50">
                <h2 className="font-semibold mb-2">Add Reminder</h2>

                <div className="flex gap-2">
                    <input
                        className="border p-2 flex-1 rounded"
                        placeholder="Reminder text"
                        value={reminderText}
                        onChange={(e) =>
                            setReminderText(e.target.value)
                        }
                    />

                    <input
                        type="date"
                        className="border p-2 rounded"
                        value={reminderDate}
                        onChange={(e) =>
                            setReminderDate(e.target.value)
                        }
                    />

                    <button
                        onClick={addReminder}
                        className="bg-yellow-500 text-white px-3 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto space-y-2 bg-gray-50 p-3 rounded border">
                {messages.length === 0 ? (
                    <p className="text-gray-400">No messages yet</p>
                ) : (
                    messages.map((m) => (
                        <div
                            key={m.id}
                            className="bg-white p-2 rounded shadow"
                        >
                            <div>{m.text}</div>
                            <div className="text-xs text-gray-400">
                                {m.created_at || ""}
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