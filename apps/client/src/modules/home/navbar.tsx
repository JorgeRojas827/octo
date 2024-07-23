import Link from "next/link";
import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import { SignInButton } from "./components/sign-in-button";

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
          <SignInButton />
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
