import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center py-2">
      <Link href={"/"} className="font-bold text-xl">
        Octo
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default DashboardHeader;
