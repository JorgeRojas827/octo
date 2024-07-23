"use client";
import Link from "next/link";
import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";

import { signIn } from "next-auth/react";
import { GithubIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed z-30 w-full backdrop-filter backdrop-blur-sm bg-opacity-10 border-b">
      <MaxWidthWrapper className="flex items-center justify-between py-3.5">
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
        <section className="flex items-center gap-x-5">
          <button className="flex space-x-3" onClick={() => signIn("github")}>
            <GithubIcon />
            <span>Sign In</span>
          </button>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
