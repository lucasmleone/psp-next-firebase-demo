
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (email: string, pass: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        if (userCredential.user) {
            return userCredential.user;
        } else {
            return null;
        }

    } catch (error) {
        console.error("Error en Login:", error);
        throw error;
    }
};