import { useState } from "react";
import { AuthContext } from "./AuthContextProvider";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (data) => {
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}