import React from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

console.log('Dashboard module is being loaded');

const DynamicCard = dynamic(() => import('@/components/ui/card').then(mod => mod.Card), { ssr: false });
const DynamicCardContent = dynamic(() => import('@/components/ui/card').then(mod => mod.CardContent), { ssr: false });
const DynamicCardHeader = dynamic(() => import('@/components/ui/card').then(mod => mod.CardHeader), { ssr: false });
const DynamicCardTitle = dynamic(() => import('@/components/ui/card').then(mod => mod.CardTitle), { ssr: false });

const ErrorFallback = ({ error }) => (
  <div className="text-center text-red-500">
    <h1>Something went wrong:</h1>
    <pre>{error.message}</pre>
  </div>
);

const ServerDashboardContent = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Welcome to your Fishing Journal Dashboard</h2>
    <p>This is a placeholder for your dashboard content.</p>
    <div className="mt-4">
      <LoadingSpinner />
    </div>
  </div>
);

const ClientDashboardContent = () => (
  <DynamicCard>
    <DynamicCardHeader>
      <DynamicCardTitle>Welcome to your Fishing Journal Dashboard</DynamicCardTitle>
    </DynamicCardHeader>
    <DynamicCardContent>
      <p>This is a placeholder for your dashboard content.</p>
      <div className="mt-4">
        <LoadingSpinner />
      </div>
    </DynamicCardContent>
  </DynamicCard>
);

const DashboardContent = () => {
  console.log('DashboardContent is being rendered');
  if (typeof window === 'undefined') {
    console.log('Rendering server-side dashboard content');
    return <ServerDashboardContent />;
  }
  console.log('Rendering client-side dashboard content');
  return <ClientDashboardContent />;
};

const Dashboard = () => {
  console.log('Main Dashboard component is being rendered');
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DashboardContent />
      </ErrorBoundary>
    </div>
  );
};

export default Dashboard;