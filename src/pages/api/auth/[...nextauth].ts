import { getNextAuthOptions } from "@/backend/auth/options";
import { createContext } from "@/backend/context";
import { NextApiHandler } from "next";
import NextAuth from "next-auth";

const handler: NextApiHandler = async (req, res) => {
  const { db } = await createContext({
    req,
    res,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return NextAuth(getNextAuthOptions(db))(req, res);
};

export default handler;
