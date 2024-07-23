"use client";

import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <button className="flex space-x-3" onClick={() => signIn("github")}>
      <GithubIcon />
      <span>Sign In</span>
    </button>
  );
};
