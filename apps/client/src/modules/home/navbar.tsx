"use client";
import Link from "next/link";
import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  console.log({ session });

  return (
    <div className="fixed z-30 w-full backdrop-filter backdrop-blur-sm bg-opacity-10 border-b">
      <MaxWidthWrapper className="flex items-center justify-between py-2">
        <section className="flex items-center space-x-10">
          <Link href={"/"} className="font-bold text-xl">
            Octo
          </Link>
          <Link href={"/"} className="font-light">
            About us
          </Link>
          <Link href={"/"} className="font-light">
            Resources
          </Link>
        </section>
        <section className="flex items-center gap-x-4">
          <button onClick={() => signIn("github")}>Sign In</button>
          <button onClick={() => signOut()}>Log out</button>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
