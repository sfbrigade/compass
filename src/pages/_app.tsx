import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { trpc } from "@/client/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import "../styles/globals.css";
import { QueryCache } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import superjson from "superjson";
import styles from "../../src/styles/Toast.module.css";
import CustomToast from "./customToast";

interface CustomPageProps {
  session: Session;
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof Error) {
              const errorMessages: { [key: string]: string } = {
                BAD_REQUEST: "400: Bad request, please try again",
                UNAUTHORIZED: "401: Unauthorized Error",
                NOT_FOUND: "404: Page not found",
              };

              const defaultMessage = "An error occured. Please try again";
              const errorMessage =
                errorMessages[error.message] || defaultMessage;
              toast.error(errorMessage, { className: styles["custom-toast"] });
            }
          },
        }),
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        // Log in development and only log errors in production
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <>
      <Head>
        <title>Compass</title>
        <meta name="description" content="Make IEPs easier" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session}>
            <CustomToast />
            <Component {...pageProps} showErrorToast={toast.error} />
          </SessionProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
}
