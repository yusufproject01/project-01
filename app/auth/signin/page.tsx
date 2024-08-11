"use client"

import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Loading from "@/app/loading"

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state

        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User Signed In:', user);
            setLoading(true);
            <Loading />
            // Redirect to home page
            router.push('/');
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
            setError("Invalid email or password. Please check your credentials and try again.");

            // Redirect to signup page if the error indicates that the user does not exist
            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                router.push('/auth/signup');
            }
        }
    };

    return (
        <main className="w-full h-screen flex justify-center items-center">
            <section className="w-80 h-auto flex flex-col justify-start items-center py-6 px-8 gap-4 bg-white rounded-lg shadow-md shadow-primary">
                <h1 className="text-xl font-semibold text-slate-800">Sign In</h1>
                <form onSubmit={handleSignIn} className="w-full flex flex-col items-center gap-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="text-sm border border-primary shadow-md rounded-lg w-64 h-8 focus:outline-none focus:shadow-primary focus:ring-1 text-center"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="text-sm border border-primary shadow-md rounded-lg w-64 h-8 focus:outline-none focus:shadow-primary focus:ring-1 text-center"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <p className="text-sm text-blue-400 italic w-full flex justify-end hover:brightness-90">
                        <Link href={'/'}>Forgot password?</Link>
                    </p>
                    <button
                        type="submit"
                        className="w-64 h-8 text-base text-white bg-primary rounded-xl flex justify-center items-center hover:brightness-90"
                        disabled={loading}>
                        {loading ? 'Loging...' : 'Login'}
                    </button>
                </form>
                <div className="w-full flex justify-between">
                    <Link href={'/auth/signup'} className="w-28 h-8 text-base text-white bg-primary rounded-xl flex justify-center items-center hover:brightness-90">Signup</Link>
                    <Link href={'/'} className="w-28 h-8 text-base text-white bg-primary rounded-xl flex justify-center items-center hover:brightness-90">Cancel</Link>
                </div>
            </section>
        </main>
    )
}

export default SignInPage
