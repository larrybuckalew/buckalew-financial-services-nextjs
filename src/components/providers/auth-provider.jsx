import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        checkAuth();
    }, []);
    async function checkAuth() {
        try {
            const response = await fetch("/api/auth/session");
            const data = await response.json();
            setUser(data.user);
        }
        catch (error) {
            console.error("Auth check failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    }
    async function login(email, password) {
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setUser(data.user);
        }
        finally {
            setIsLoading(false);
        }
    }
    async function logout() {
        setIsLoading(true);
        try {
            await fetch("/api/auth/logout");
            setUser(null);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (<AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
