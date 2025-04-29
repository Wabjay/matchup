"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white">
      Sign Out
    </button>
  ) : (
    <button onClick={() => signIn()} className="px-4 py-2 bg-green-500 text-white">
      Sign In
    </button>
  );
};

export default AuthButton;
