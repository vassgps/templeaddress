import { adminRefreshToken, refreshToken } from "@/Api/Api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, id, accessToken, refreshToken, accessTokenExp, role } =
          credentials as {
            email: string;
            id: number;
            accessToken: string;
            refreshToken: string;
            accessTokenExp: number;
            role: string;
          };

        const user = {
          email,
          id,
          accessToken,
          accessTokenExp,
          refreshToken,
          role,
        };
        if (user) {
          return Promise.resolve(user);
        }
        return Promise.resolve(null);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      const tokenExp = token.accessTokenExp * 1000;
      const currentTime = Date.now();
      if (tokenExp&&tokenExp < currentTime - 500) {
        // try {
        //   let data = null;
        //   if (token.role === "adminRole") {
        //     data = await adminRefreshToken(token.refreshToken);
        //   } else {
        //     data = await refreshToken(token.refreshToken);
        //   }
        //   if (data && data.status) {
        //     token.refreshToken = data.refreshToken;
        //     token.accessToken = data.accessToken;
        //     token.accessTokenExp = data.accessTokenExp;
        //     session.user = token as any;
        //     return session;
        //   } else {
        //     return null;
        //   }
        // } catch (error) {
        //   return null;
        // }
        // session.user = token as any;
        return null;
      } else {
        session.user = token as any;
        return session;
      }
    },
  },
  secret: "process.env.NEXTAUTH_SECRET",
  session: {
    maxAge: 2 * 365 * 24 * 60 * 60,
  },
});
