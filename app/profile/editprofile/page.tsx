"use client"

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../../loading";
import { useRouter } from "next/navigation";

interface UserData {
    name: string;
    email: string;
    image: string;
}

const ChangeProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                try {
                    const userDocRef = doc(collection(db, "users"), user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data() as UserData;
                        setUserData(data);
                        setImagePreview(data.image || null);
                        setName(data.name);
                        setEmail(data.email);
                    } else {
                        console.log("No user data found");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
                setUserData(null);
                setImagePreview(null);
                setName('');
                setEmail('');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImagePreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (file && user) {
            try {
                if (userData?.image) {
                    const oldImagePath = userData.image.split('/o/')[1].split('?')[0];
                    const oldImageRef = ref(storage, decodeURIComponent(oldImagePath));
                    await deleteObject(oldImageRef).catch(error => console.warn("Error deleting old file:", error));
                }

                const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                const userDocRef = doc(collection(db, "users"), user.uid);
                await updateDoc(userDocRef, { image: downloadURL });

                setUserData(prevData => prevData ? { ...prevData, image: downloadURL } : null);
                setImagePreview(downloadURL);
                setFile(null);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleSave = async () => {
        if (user) {
            try {
                const userDocRef = doc(collection(db, "users"), user.uid);
                await updateDoc(userDocRef, {
                    name,
                    email
                });

                if (file) {
                    await handleFileUpload();
                    <Loading/>
                    router.push('/profile');
                } else {
                    router.push('/profile');
                }
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <div className="h-screen w-full pt-20">
            {user ? (
                <div>
                    {userData ? (
                        <div>
                            <div className="bg-slate-300 w-52 h-52 relative ml-12 rounded overflow-hidden group">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="ml-8 absolute cursor-pointer z-50 w-full h-full opacity-0"
                                />
                                <p className={`opacity-0 group-hover:opacity-100 absolute bottom-0 ml-2 mb-2 text-sm ${imagePreview || userData.image || file ? "text-white" : "text-black"}`}>
                                    Change Profile
                                </p>
                                <Image
                                    src={imagePreview || userData.image || '/assets/default/noImage.jpg'}
                                    alt="Profile"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-10 flex flex-col ml-10 gap-4 w-52">
                                <label className="w-full">Nama Lengkap</label>
                                <input
                                    type="text"
                                    id="nameEdit"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-8 pl-2"
                                />
                                <label className="w-full">Email</label>
                                <input
                                    type="text"
                                    id="emailEdit"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-8 pl-2"
                                />
                                <button
                                    onClick={handleSave}
                                    className="bg-qutenary text-white p-2 rounded mt-2 ml-12"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p><Loading /></p>
                    )}
                </div>
            ) : (
                <p>No user is logged in</p>
            )}
        </div>
    );
};

export default ChangeProfile;
