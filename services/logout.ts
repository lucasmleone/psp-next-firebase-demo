import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const logOutService = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};