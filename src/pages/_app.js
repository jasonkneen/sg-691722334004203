import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from "next-themes";
import DeviceWrapper from "@/components/DeviceWrapper";

const ErrorFallback = ({ error }) => (
  <div className="text-center text-red-500">
    <h1>Something went wrong:</h1>
    <pre>{error.message}</pre>
  </div>
);

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DeviceWrapper>
          <Layout>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Component {...pageProps} />
            </ErrorBoundary>
            <Toaster />
          </Layout>
        </DeviceWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
}