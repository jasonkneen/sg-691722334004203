import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from "next-themes";
import dynamic from 'next/dynamic';

console.log('_app module is being loaded');

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
  console.log('MyApp is being rendered');

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {typeof window === 'undefined' ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <DynamicDeviceWrapper>
            <Layout>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Component {...pageProps} />
              </ErrorBoundary>
              <Toaster />
            </Layout>
          </DynamicDeviceWrapper>
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;