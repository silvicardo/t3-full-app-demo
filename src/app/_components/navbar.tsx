import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="flex justify-between bg-gray-800 text-white">
      {session?.user ? <span>{session.user.name}</span> : null}
      {session?.user ? (
        <Link href={"/api/auth/signout"}>Logout</Link>
      ) : (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
    </nav>
  );
}
