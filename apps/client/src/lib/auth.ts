import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { githubInstance } from "@/lib/axios/instances";
import api from "@/common/helpers/axios-helper";

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
      authorization: {
        params: {
          scope: "read:user user:email public_repo",
        },
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
          accessToken: account["access_token"] as string,
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
  secret: process.env.NEXTAUTH_SECRET,
};
