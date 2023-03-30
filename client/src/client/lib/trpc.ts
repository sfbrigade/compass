import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "api/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
