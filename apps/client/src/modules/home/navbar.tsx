"use client";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/common/components/ui/button";

const Navbar = () => {
  const session = useSession();

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
          <button onClick={() => signIn("github")}>Sigin Github</button>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
