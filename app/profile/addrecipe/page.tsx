"use client"

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db, auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { fetchUserName } from "@/lib/api/fetchCollection";

export default function AddRecipe() {
    const [nama_makanan, setNamaMakanan] = useState<string>('');
    const [ingredients, setIngredients] = useState<{ amount: string; unit: string; name: string }[]>([]);
    const [instructions, setInstructions] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setFiles(newFiles);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(newPreviews);
        }
    };

    const handleSubmit = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error("No user is signed in");
                return;
            }

            // Ambil nama pengguna
            const userName = await fetchUserName(user.uid);
            if (!userName) {
                console.error("Failed to fetch user name");
                return;
            }

            // Upload images and get URLs
            const imageUrls: string[] = [];
            for (const file of files) {
                const storageRef = ref(storage, `recipeImages/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                imageUrls.push(downloadURL);
            }

            // Add recipe to Firestore
            await addDoc(collection(db, "recipes"), {
                nama_makanan,
                ingredients,
                instructions,
                description,
                images: imageUrls,
                userId: user.uid,
                userName: userName, // Simpan nama pengguna di Firestore
                createdAt: new Date() // Menyimpan timestamp saat resep ditambahkan
            });

            // Clear the form
            setNamaMakanan('');
            setIngredients([]);
            setInstructions('');
            setDescription('');
            setFiles([]);
            setImagePreviews([]);

            // Redirect or show success message
            router.push('/profile');
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    return (
        <section className="pt-24">
            <div className="max-w-7xl w-full h-auto bg-white shadow-lg rounded-md mx-auto flex flex-col py-8 px-4 gap-4">
                <h1 className="text-2xl font-semibold w-full text-center">Tambah Resep</h1>
                <div className="flex flex-col justify-center w-full mx-10 gap-4">
                    <label className="max-w-6xl w-full text-xl">
                        Foto Masakan
                    </label>
                    <div className="flex gap-6">
                        <label className="w-36 h-36 border-2 border-solid flex justify-center items-center text-3xl bg-slate-400 rounded shadow-lg hover:brightness-90 relative cursor-pointer">
                            +
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="absolute w-full h-full top-0 opacity-0"
                            />
                        </label>
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="w-36 h-36 border-2 border-solid flex justify-center items-center overflow-hidden relative">
                                <img src={preview} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                    <label className="max-w-6xl w-full text-xl">
                        Nama Masakan
                    </label>
                    <input
                        type="text"
                        value={nama_makanan}
                        onChange={(e) => setNamaMakanan(e.target.value)}
                        className="max-w-6xl w-full h-16 rounded focus:outline-none shadow-md pl-4 border"
                        placeholder="Masukkan Nama Masakan"
                    />
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                    <label className="max-w-6xl w-full text-xl">
                        Deskripsi
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="max-w-6xl w-full h-32 rounded focus:outline-none shadow-md p-4 border resize-none"
                        placeholder="Deskripsi Masakan"
                    />
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                    <label className="max-w-6xl w-full text-xl">
                        Bahan-Bahan Masakan:
                    </label>
                    <div className="flex flex-col gap-2 w-full">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={ingredient.name}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index] = { ...newIngredients[index], name: e.target.value };
                                        setIngredients(newIngredients);
                                    }}
                                    className="w-1/2 h-10 p-2 border rounded"
                                    placeholder="Nama Bahan"
                                />
                                <input
                                    type="text"
                                    value={ingredient.amount}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index] = { ...newIngredients[index], amount: e.target.value };
                                        setIngredients(newIngredients);
                                    }}
                                    className="w-1/4 h-10 p-2 border rounded"
                                    placeholder="Jumlah"
                                />
                                <select
                                    value={ingredient.unit}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index] = { ...newIngredients[index], unit: e.target.value };
                                        setIngredients(newIngredients);
                                    }}
                                    className="w-1/4 h-10 p-2 border rounded"
                                >
                                    <option value="">Pilih Satuan</option>
                                    <option value="gram">Gram</option>
                                    <option value="kilogram">Kilogram</option>
                                    <option value="sendok makan">Sendok Makan</option>
                                    <option value="sendok teh">Sendok Teh</option>
                                    <option value="potong">Potong</option>
                                    <option value="buah">Buah</option>
                                    {/* Add more options if needed */}
                                </select>
                            </div>
                        ))}
                        <button
                            onClick={() => setIngredients([...ingredients, { name: '', amount: '', unit: '' }])}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Tambah Bahan
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                    <label className="max-w-6xl w-full text-xl">
                        Cara Masak:
                    </label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="max-w-6xl w-full h-80 rounded focus:outline-none shadow-md p-4 border resize-none"
                        placeholder="Cara Masak"
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-qutenary text-white p-2 rounded"
                    >
                        Simpan Resep
                    </button>
                </div>
            </div>
        </section>
    );
}
