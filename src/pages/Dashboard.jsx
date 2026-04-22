import { useCRM } from "../context/CRMContext";

export default function Dashboard() {
    const { contacts, loading } = useCRM();

    if (loading) {
        return (
            <div className="p-4 text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    const today = new Date().toISOString().split("T")[0];

    const allReminders = contacts.flatMap((c) =>
        (c.reminders || []).map((r) => ({
            ...r,
            contactName: c.name,
        }))
    );

    const safeReminders = allReminders.filter(Boolean);

    const todayReminders = safeReminders.filter(
        (r) => r.date === today && !r.done
    );

    const overdueReminders = safeReminders.filter(
        (r) => r.date < today && !r.done
    );

    const upcomingReminders = safeReminders.filter(
        (r) => r.date > today && !r.done
    );

    const activeContacts = contacts?.length || 0;

    return (
        <div className="p-4 max-w-2xl mx-auto">

            {/* HEADER */}
            <h1 className="text-2xl font-bold mb-4">
                📊 CRM Dashboard
            </h1>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 mb-6">

                <div className="p-4 bg-white shadow rounded">
                    <div className="text-sm text-gray-500">
                        Active Contacts
                    </div>
                    <div className="text-xl font-bold">
                        {activeContacts}
                    </div>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <div className="text-sm text-gray-500">
                        Today Tasks
                    </div>
                    <div className="text-xl font-bold text-blue-500">
                        {todayReminders.length}
                    </div>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <div className="text-sm text-gray-500">
                        Overdue
                    </div>
                    <div className="text-xl font-bold text-red-500">
                        {overdueReminders.length}
                    </div>
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <div className="text-sm text-gray-500">
                        Upcoming
                    </div>
                    <div className="text-xl font-bold text-green-500">
                        {upcomingReminders.length}
                    </div>
                </div>
            </div>

            {/* TODAY SECTION */}
            <div className="mb-6">
                <h2 className="font-bold mb-2 text-blue-600">
                    🔥 Today’s Work
                </h2>

                {todayReminders.length === 0 ? (
                    <p className="text-gray-400">
                        No tasks for today 🎉
                    </p>
                ) : (
                    todayReminders.map((r) => (
                        <div
                            key={r.id}
                            className="p-3 border rounded mb-2 bg-white"
                        >
                            <div className="font-semibold">
                                {r.text}
                            </div>
                            <div className="text-sm text-gray-500">
                                {r.contactName}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* OVERDUE */}
            <div className="mb-6">
                <h2 className="font-bold mb-2 text-red-600">
                    ⚠ Overdue Tasks
                </h2>

                {overdueReminders.length === 0 ? (
                    <p className="text-gray-400">
                        No overdue tasks
                    </p>
                ) : (
                    overdueReminders.map((r) => (
                        <div
                            key={r.id}
                            className="p-3 border rounded mb-2 bg-red-50"
                        >
                            <div className="font-semibold">
                                {r.text}
                            </div>
                            <div className="text-sm text-gray-500">
                                {r.contactName} • {r.date}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* EMPTY SYSTEM STATE */}
            {contacts.length === 0 && (
                <div className="text-center text-gray-400 mt-10">
                    No data yet — start by adding contacts
                </div>
            )}
        </div>
    );
}