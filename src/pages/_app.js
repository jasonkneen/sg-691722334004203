import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ErrorBoundary>
    </ThemeProvider>
  );
}