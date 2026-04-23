import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCRM } from "../context/useCRM";
import { useAuth } from "../context/useAuth";

export default function MainLayout({ children }) {
    const { reloadContacts } = useCRM();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    // Load contacts when MainLayout mounts
    useEffect(() => {
        reloadContacts();
    }, [reloadContacts]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* SIDEBAR */}
            <div className="w-72 bg-white shadow-lg flex flex-col">
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">ChatFlow</h1>
                            <p className="text-xs text-gray-500">Smart CRM</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                        }
                    >
                        <span className="text-xl">📊</span>
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/contacts"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                        }
                    >
                        <span className="text-xl">👥</span>
                        Contacts
                    </NavLink>

                    <NavLink
                        to="/reminders"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive
                                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                        }
                    >
                        <span className="text-xl">🔔</span>
                        Reminders
                    </NavLink>
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-100">
                    <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-600">Logged in as</p>
                        <p className="font-semibold text-gray-900 truncate">{user?.email || "User"}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-100 shadow-sm px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Welcome back!</h2>
                        <div className="text-sm text-gray-500">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}