import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { trpc } from "@/client/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { useState } from "react";
import "../styles/globals.css";
import { QueryCache } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Head from "next/head";
import superjson from "superjson";
import CustomToast from "@/components/CustomToast";
import Layout from "@/components/layout/Layout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { compassTheme as theme } from "@/theme";
import { FontProvider } from "@/components/font-provider";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof Error) {
              if (error.message === "UNAUTHORIZED") {
                void router.push("/sorry");
              } else {
                const errorMessages: { [key: string]: string } = {
                  BAD_REQUEST: "400: Bad request, please try again",
                  NOT_FOUND: "404: Page not found",
                };

                const defaultMessage = "An error occurred. Please try again";
                const msg = errorMessages[error.message] || defaultMessage;
                setErrorMessage(msg);
              }
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
      <FontProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                  <SessionProvider session={pageProps.session}>
                    {errorMessage && (
                      <CustomToast errorMessage={errorMessage} />
                    )}
                    <Layout>
                      <Component {...pageProps} showErrorToast={toast.error} />
                    </Layout>
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
