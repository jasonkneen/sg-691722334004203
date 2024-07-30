import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ErrorBoundary>
  );
}