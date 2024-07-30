import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export const monitoringAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User Signed In:' + user);
        } else {
            console.log("You're not signed in");
        }

    })
}

export const existUser = async () => {
    const [] = useState(false)
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            useEffect
        }
    })
}