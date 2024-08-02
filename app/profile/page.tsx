"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                try {
                    // Ambil data pengguna dari Firestore
                    const userDocRef = doc(collection(db, "users"), user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    } else {
                        console.log("No user data found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen w-full pt-20">
            <h1>Profile</h1>
            {user ? (
                <div>
                    {userData ? (
                        <div>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            {/* Tampilkan informasi pengguna lainnya di sini */}
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            ) : (
                <p>No user is logged in</p>
            )}
        </div>
    );
};

export default ProfilePage;
