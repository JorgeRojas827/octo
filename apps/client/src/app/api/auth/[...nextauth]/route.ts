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
    async jwt({ token, user, account }) {
      if (account && user) {
        const { data: githubData } = await githubInstance.get(
          `/user/${user.id}`
        );

        const { data: userData } = await api.users.register({
          email: user.email,
          githubId: user.id,
          username: githubData.login,
          fullName: githubData.name,
        });

        token.accessToken = userData.access_token;
        token.userId = user.id;
        token.username = githubData.login;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user!.id = token.userId!;
      session.user!.username = token.username!;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.APP_JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
