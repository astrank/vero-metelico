import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../utils/Auth";
import { CommentsProvider } from "../utils/Comments";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <CommentsProvider>
                <Component {...pageProps} />
            </CommentsProvider>
        </AuthProvider>
    );
}

export default MyApp;
