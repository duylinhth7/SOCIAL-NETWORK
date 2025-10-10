import { createContext, useEffect, useState } from "react";
import { getInfoUser } from "../api/auth.api";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            getInfoUser(token)
                .then((data) => setUser(data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;