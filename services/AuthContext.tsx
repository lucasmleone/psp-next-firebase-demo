'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { retrieveUser } from "./docSnap";
import { logOutService } from "./logout";

interface AuthContext {
    user: User | null;
    userData: any | null;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({
    user: null,
    userData: null,
    loading: true,
    logout: () => { }
})
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {

                try {
                    const docSnap = await retrieveUser(currentUser.uid)
                    if (docSnap) {
                        setUser(currentUser)
                        setUserData(docSnap.data())
                        setLoading(false)
                    } else {
                        console.error("No se encontro el usuario")
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error)
                }
            } else {
                setUser(null)
                setUserData(null)
                setLoading(false)
            }
            setLoading(false)
        })
        return () => unsuscribe()
    }, [])
    const logout = async () => {
        await logOutService();
        setUser(null);
        setUserData(null);
    }
    return (
        <AuthContext.Provider value={{ user, userData, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);