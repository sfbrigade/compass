import { useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import superjson from "superjson";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryCache, MutationCache } from "@tanstack/react-query";
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";

import { AppRouter } from "@/backend/routers/_app";
import { trpc } from "@/client/lib/trpc";
import { BreadcrumbsContextProvider } from "@/components/design_system/breadcrumbs/BreadcrumbsContext";
import type { Breadcrumb } from "@/components/design_system/breadcrumbs/Breadcrumbs";
import CustomToast from "@/components/CustomToast";
import { FontProvider } from "@/components/font-provider";
import Layout from "@/components/layout/Layout";
import { compassTheme as theme } from "@/theme";

import "../styles/globals.css";

// custom page type from Next.js documentation:
// https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithBreadcrumbs<P = {}, IP = P> = NextPage<P, IP> & {
  getBreadcrumbs?: () => Breadcrumb[];
};

interface CustomPageProps {
  session: Session;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomAppProps = AppProps<CustomPageProps> & {
  Component: NextPageWithBreadcrumbs<CustomPageProps>;
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            handleTRPCError(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: unknown) => {
            handleTRPCError(error);
          },
        }),
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
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

  const handleTRPCError = (error: unknown) => {
    const trpcError = error as TRPCClientError<AppRouter>;
    const errorCode = trpcError.data?.code as keyof typeof errorMessages;
    const errorMessage = trpcError.message;

    const errorMessages = {
      BAD_REQUEST: errorMessage || "400: Bad request, please try again",
      UNAUTHORIZED: "401: Unauthorized Error",
      NOT_FOUND: "404: Page not found",
      FORBIDDEN: "403: Access denied",
    } as const;

    setErrorMessage(errorMessages[errorCode] ?? "An unexpected error occurred");
  };

  return (
    <>
      <Head>
        <title>Compass</title>
        <meta name="description" content="Make IEPs easier" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <FontProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                  <SessionProvider session={pageProps.session}>
                    {errorMessage && (
                      <CustomToast
                        errorMessage={errorMessage}
                        onClose={() => setErrorMessage("")}
                      />
                    )}
                    <BreadcrumbsContextProvider>
                      <Layout initialBreadcrumbs={Component.getBreadcrumbs?.()}>
                        <Component {...pageProps} />
                      </Layout>
                    </BreadcrumbsContextProvider>
                  </SessionProvider>
                </QueryClientProvider>
              </trpc.Provider>
            </LocalizationProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </FontProvider>
    </>
  );
}
