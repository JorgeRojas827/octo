"use client"

import { signIn } from "next-auth/react";

const GetStartedButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative group mt-4">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <button
        onClick={() => signIn("github")}
        className="relative px-12 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
      >
        <span className="group-hover:text-purple-600 transition duration-200 flex items-center text-xl font-semibold hover:ease-linear">
          {children}
        </span>
      </button>
    </div>
  );
};

export default GetStartedButton;
