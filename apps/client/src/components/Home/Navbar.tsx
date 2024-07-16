import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
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
        <section>
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
