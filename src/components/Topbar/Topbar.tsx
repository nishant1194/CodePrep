import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {};

const Topbar: React.FC<Props> = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsed = JSON.parse(userData);
      setUser({ id: parsed.id, name: parsed.name });
    }
  }, []);

  const handleSignIn = () => {
    router.push("/auth");
  };

  const handleProfile = () => {
    if (user) {
      router.push(`/profile/${user.id}`); // use user.id for dynamic route
    }
  };

  return (
    <div className="bg-[rgb(40,40,40)] flex items-center justify-between sm:px-12 px-2 py-3 md:px-32">
      <Link href={"/"}>
        <Image src="/logo-full.png" alt="LeetClone" height={100} width={100} />
      </Link>

      {user ? (
        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-[#ffa116]"
          onClick={handleProfile}
        >
          <Image
            src={`https://i.pravatar.cc/150?u=${user.id}`} // random avatar per user
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      ) : (
        <button
          className="bg-[#ffa116] text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                    hover:text-[#ffa116] hover:bg-white hover:border-2 hover:border-[#ffa116] border-2 border-transparent
                    transition duration-300 ease-in-out"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Topbar;
