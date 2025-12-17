
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react"

export const retrieveUser = async (uid: string) => {
    const [docSnap, setDocSnap] = useState<any | null>(null)
    try {
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        setDocSnap(docSnap)

    }
    catch (error) {
        console.error("Error al obtener datos del usuario:", error)
    }
    if (docSnap) {
        return docSnap;
    } else {
        return null;
    }

};