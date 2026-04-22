import { useCRM } from "../context/CRMContext";

export default function Reminders() {
    const { contacts, setContacts } = useCRM();

    const allReminders = contacts.flatMap((c) =>
        (c.reminders || []).map((r) => ({
            ...r,
            contactName: c.name,
            contactId: c.id,
        }))
    );

    const markDone = (reminderId, contactId) => {
        const updated = contacts.map((c) => {
            if (c.id === contactId) {
                return {
                    ...c,
                    reminders: c.reminders.map((r) =>
                        r.id === reminderId ? { ...r, done: true } : r
                    ),
                };
            }
            return c;
        });

        setContacts(updated);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Reminders
            </h1>

            {allReminders.length === 0 ? (
                <p className="text-gray-500">
                    No reminders yet
                </p>
            ) : (
                allReminders.map((r) => (
                    <div
                        key={r.id}
                        className={`p-3 border mb-2 rounded ${r.done ? "bg-green-100" : "bg-white"
                            }`}
                    >
                        <div className="font-semibold">
                            {r.text}
                        </div>

                        <div className="text-sm text-gray-500">
                            {r.contactName} • {r.date}
                        </div>

                        {!r.done && (
                            <button
                                onClick={() =>
                                    markDone(r.id, r.contactId)
                                }
                                className="mt-2 text-sm text-blue-500"
                            >
                                Mark as done
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}