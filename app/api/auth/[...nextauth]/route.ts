import { connectDB } from "@/utils/mongodbConnection";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectDB();

          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const decryptedPassword = await CryptoJS.AES.decrypt(
            user.password,
            process.env.CRYPTOJS_SECRET!
          ).toString(CryptoJS.enc.Utf8);

          if (password !== decryptedPassword) {
            return null;
          }

          console.log(user)

          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
};

const handler: any = NextAuth(authOptions);
export { handler as GET, handler as POST };
