import Link from "next/link"

const page = () => {
    return (
        <div>
            <h1>Profile</h1>
            <Link href="/" className="text-blue-500">Home</Link>
        </div>
    )
}

export default page