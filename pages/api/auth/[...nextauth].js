import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    //google provider
    GoogleProvider({
      clientId: process.env.CLEINT_ID,
      clientSecret: process.env.CLEINT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
});
