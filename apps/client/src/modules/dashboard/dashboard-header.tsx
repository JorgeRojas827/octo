"use client";
import { Avatar } from "@/common/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import { AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  const session = useSession();

  return (
    <header className="flex justify-between items-center py-2">
      <Link href={"/"} className="font-bold text-xl">
        <Image src="/octo.svg" alt="Octo" width={50} height={50} />
      </Link>
      <picture>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-auto">
            <Avatar>
              <AvatarImage src={session.data!.user!.image!} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </picture>
    </header>
  );
};

export default DashboardHeader;
