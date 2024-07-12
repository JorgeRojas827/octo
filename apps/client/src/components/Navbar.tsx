import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import ShimmerButton from "./magicui/shimmer-button";

const Navbar = () => {
  return (
    <div>
      <MaxWidthWrapper className="flex items-center justify-between py-2">
        <section className="flex items-center space-x-10">
          <Link href={"/"} className="font-bold text-xl">
            Octo
          </Link>
          <Link
            href={"/"}
            className="font-light text-zinc-600 hover:text-zinc-400"
          >
            About us
          </Link>
          <Link
            href={"/"}
            className="font-light text-zinc-600 hover:text-zinc-400"
          >
            Resources
          </Link>
        </section>
        <section>
          <Link
            href={"/signin"}
          >
            {/* <ShimmerButton> */}
              Sign in
            {/* </ShimmerButton> */}
          </Link>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
