import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <h1>home</h1>
      <Link href="/profile">Profile</Link>
    </div>
  );
}
