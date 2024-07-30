import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "next-themes";
import DeviceWrapper from "@/components/DeviceWrapper";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ErrorBoundary>
        <DeviceWrapper>
          <Layout>
            <ErrorBoundary fallback={<div>Something went wrong. Please try refreshing the page.</div>}>
              <Component {...pageProps} />
            </ErrorBoundary>
            <Toaster />
          </Layout>
        </DeviceWrapper>
      </ErrorBoundary>
    </ThemeProvider>
  );
}