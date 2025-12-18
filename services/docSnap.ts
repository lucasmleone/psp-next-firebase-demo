
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const retrieveUser = async (uid: string) => {
    try {
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        return docSnap
    }
    catch (error) {
        console.error("Error al obtener datos del usuario:", error)
        return null
    }

};