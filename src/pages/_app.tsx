import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useState } from "react";
import {
    MantineProvider,
    MantineProviderProps,
} from "@mantine/core";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Devtools from "@/components/Devtools";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

const theme: MantineProviderProps["theme"] = {
    colorScheme: "light",
    fontFamily: poppins.style.fontFamily,
};

const config = {
    defaultOptions: {
        queries: {
            staleTime: 1 * 60 * 60 * 1000,
            cacheTime: 5 * 60 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    }
}

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient(config))

    return (
        <Fragment>
            <Head>
                <title>PM2 Dashboard</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>

                <SessionProvider session={pageProps.session}>
                    <QueryClientProvider client={queryClient}>
                        <Hydrate state={pageProps.dehydratedState}>
                            <Component {...pageProps} />
                            <Devtools />
                        </Hydrate>
                    </QueryClientProvider>
                </SessionProvider>
            </MantineProvider>
        </Fragment>
    );
}
