import { useCRM } from "../context/useCRM";
import { useMemo } from "react";

export default function Dashboard() {
    const { contacts, loading } = useCRM();

    const today = new Date().toISOString().split("T")[0];

    // ✅ ALWAYS run hooks BEFORE any return
    useMemo(() => {
        const safeContacts = contacts || [];
        const all = safeContacts.flatMap((c) =>
            (c.reminders || []).map((r) => ({
                ...r,
                contactName: c.name,
            }))
        ).filter(Boolean);

        return {
            todayReminders: all.filter(
                (r) => r.date === today && !r.done
            ),
            overdueReminders: all.filter(
                (r) => r.date < today && !r.done
            ),
            upcomingReminders: all.filter(
                (r) => r.date > today && !r.done
            ),
        };
    }, [contacts, today]);

    // ✅ AFTER hooks → conditional UI
    if (loading) {
        return <div className="p-4">Loading dashboard...</div>;
    }

    return (
        <div className="p-4">
            <h1>Dashboard</h1>
        </div>
    );
}