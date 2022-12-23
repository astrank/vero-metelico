import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../utils/Auth";
import { CommentsProvider } from "../utils/Comments";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <CommentsProvider>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                    `}
                </Script>
                <Component {...pageProps} />
            </CommentsProvider>
        </AuthProvider>
    );
}

export default MyApp;
