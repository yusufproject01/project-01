"use client";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Reset error state
        setError(null);

        // Validasi form
        if (!email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            // Mendaftar pengguna
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Menyimpan data pengguna di Firestore dengan UID sebagai ID dokumen
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                name: name,
                image: '',
                createdAt: new Date().toISOString(),
            });

            console.log('User Signed Up:', user);
            // Redirect to home or any other page
            router.push('/');
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full h-screen flex justify-center items-center">
            <form
                className="w-80 h-auto flex flex-col justify-start items-center py-6 px-8 gap-4 bg-white shadow-lg rounded-lg"
                onSubmit={handleSignup}
            >
                <h1 className="text-xl font-semibold text-slate-800">Signup</h1>
                <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`text-sm border border-primary shadow-md rounded-lg w-64 h-8 focus:outline-none focus:shadow-primary focus:ring-1 text-center`}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`text-sm border ${!email && error ? 'border-red-500' : 'border-primary'} text-sm border border-primary shadow-md rounded-lg w-64 h-8 focus:outline-none focus:shadow-primary focus:ring-1 text-center`}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`text-sm border ${!password && error ? 'border-red-500' : 'border-primary'} text-sm border border-primary shadow-md rounded-lg w-64 h-8 focus:outline-none focus:shadow-primary focus:ring-1 text-center`}
                    required
                />
                <input
                    type="password"
                    placeholder="Konfirmasi Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`text-sm border ${!confirmPassword && error ? 'border-red-500' : 'border-primary'} text-sm border border-primary shadow-md rounded-lg w-64 h-8 focus:outline-none focus:shadow-primary focus:ring-1 text-center`}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-64 h-8 text-base text-white bg-primary rounded-xl flex justify-center items-center hover:brightness-90"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <div className="w-full flex justify-between mt-4">
                    <Link href="/auth/signin" className="w-28 h-8 text-base text-white bg-primary rounded-xl flex justify-center items-center hover:brightness-90">Signin</Link>
                    <Link href="/" className="w-28 h-8 text-base text-white bg-primary rounded-xl flex justify-center items-center hover:brightness-90">Cancel</Link>
                </div>
            </form>
        </main>
    );
};

export default Signup;
