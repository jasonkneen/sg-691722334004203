import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from "next-themes";
import dynamic from 'next/dynamic';

const DynamicDeviceWrapper = dynamic(() => import('@/components/DeviceWrapper'), {
  ssr: false
});

const ErrorFallback = ({ error }) => (
  <div className="text-center text-red-500">
    <h1>Something went wrong:</h1>
    <pre>{error.message}</pre>
  </div>
);

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DynamicDeviceWrapper>
          <Layout>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Component {...pageProps} />
            </ErrorBoundary>
            <Toaster />
          </Layout>
        </DynamicDeviceWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;