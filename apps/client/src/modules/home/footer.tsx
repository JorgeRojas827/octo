import Link from "next/link";
import { GithubIcon } from "lucide-react";
import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";

const Footer = () => {
  return (
    <div>
      <MaxWidthWrapper className="flex justify-between py-4">
        <div className="flex flex-col gap-y-4">
          <Link href={"/"} className="font-bold text-xl">
            Octo
          </Link>
        </div>
        <div className="flex flex-col gap-y-4">
          <Link
            href="https://github.com/JorgeRojas827/octo"
            target="_blank"
            className="flex gap-x-2"
          >
            <GithubIcon className="w-5" /> Github Repository
          </Link>
          <section className="text-end opacity-50 font-light">
            All rights reserved
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
