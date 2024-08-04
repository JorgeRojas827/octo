import Link from "next/link";
import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import { SignInButton } from "./components/sign-in-button";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/common/components/ui/sheet";
import { Button } from "@/common/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed z-30 w-full backdrop-filter backdrop-blur-sm bg-opacity-10 border-b">
      {/* Navbar Desktop */}
      <MaxWidthWrapper className="hidden md:flex items-center justify-between py-2">
        <section className="flex items-center space-x-10">
          <Link
            href={"/"}
            className="font-bold text-xl flex items-center gap-x-4"
          >
            <Image src="/octo.svg" alt="Octo" width={50} height={50} />
            Octo
          </Link>
        </section>
        <section>
          <SignInButton />
        </section>
      </MaxWidthWrapper>

      {/* Navbar Mobile */}
      <MaxWidthWrapper className="block py-1 mt-1 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            aria-describedby="mobile-menu"
            className="flex flex-col"
          >
            <SheetTitle>
              <Link href={"/"} className="text-2xl font-bold">
                <Image src="/octo.svg" alt="Octo" width={50} height={50} />
              </Link>
            </SheetTitle>
            <nav className="flex flex-col justify-between" id="mobile-menu">
              <div className="flex flex-col gap-y-4">
                <SignInButton />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
