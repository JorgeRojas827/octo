import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

import { githubInstance } from "@/lib/axios/instances";
import api from "@/lib/setup-axios";
import { cookies } from "next/headers";

const AUTH_COOKIE_KEY = process.env.AUTH_COOKIE_KEY!;

const setAuthCookie = (token: string) => {
  cookies().set(AUTH_COOKIE_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const { data: githubData } = await githubInstance.get(
        `/user/${token.uid}`
      );

      if (session?.user) {
        const { data: userData } = await api.users.register({
          email: session.user.email,
          githubId: token.uid,
          username: githubData.login,
          fullName: githubData.name,
        });

        setAuthCookie(userData.access_token);
        session.user.id = token.uid as string;
        session.user.username = githubData.login;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) token.uid = user.id;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.APP_JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
