import { useCRM } from "../context/useCRM";
import { reminderService } from "../services/reminderService";

export default function Reminders() {
    const { contacts, setContacts, loading } = useCRM();

    if (loading) {
        return (
            <div className="p-4 text-gray-500">
                Loading reminders...
            </div>
        );
    }

    const today = new Date().toISOString().split("T")[0];
    const safeContacts = contacts || [];

    // flatten
    const allReminders = safeContacts.flatMap((c) =>
        (c.reminders || []).map((r) => ({
            ...r,
            contactName: c.name,
            contactId: c.id,
        }))
    );

    const todayReminders = allReminders.filter(
        (r) => r.date === today && !r.done
    );

    const upcomingReminders = allReminders.filter(
        (r) => r.date > today && !r.done
    );

    const overdueReminders = allReminders.filter(
        (r) => r.date < today && !r.done
    );

    // 🚀 FIXED: API + STATE SYNC
    const markDone = async (reminderId, contactId) => {
        try {
            await reminderService.markDone(reminderId);

            const updated = safeContacts.map((c) => {
                if (c.id === contactId) {
                    return {
                        ...c,
                        reminders: (c.reminders || []).map((r) =>
                            r.id === reminderId
                                ? { ...r, done: true }
                                : r
                        ),
                    };
                }
                return c;
            });

            setContacts(updated);
        } catch (err) {
            console.error("Failed to mark reminder", err);
        }
    };

    const renderList = (title, list, color) => (
        <div className="mb-6">
            <h2 className={`font-bold mb-2 ${color}`}>
                {title}
            </h2>

            {list.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    No items
                </p>
            ) : (
                list.map((r) => (
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

    return (
        <div className="p-4 max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-4">
                📅 CRM Reminder Dashboard
            </h1>

            {renderList("🔥 Today", todayReminders, "text-red-500")}
            {renderList("⏭ Upcoming", upcomingReminders, "text-blue-500")}
            {renderList("⚠ Overdue", overdueReminders, "text-orange-500")}

            {safeContacts.length === 0 && (
                <div className="text-center text-gray-400 mt-10">
                    No data yet — start by adding contacts
                </div>
            )}
        </div>
    );
}