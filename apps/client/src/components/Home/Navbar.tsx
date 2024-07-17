import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const Navbar = async () => {
  
  const user = await currentUser();

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
          {
            user && (
              <Link href={"/dashboard"} className="text-sm font-semibold">
                Dashboard
              </Link>
            )
          }
          <SignedOut>
            <SignInButton 
              fallbackRedirectUrl={"/dashboard"}
              forceRedirectUrl={"/dashboard"}
            />
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
