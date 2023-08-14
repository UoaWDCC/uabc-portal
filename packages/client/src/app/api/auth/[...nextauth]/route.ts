import NextAuth from "next-auth";
import { authOption } from "../../../../options";


const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
