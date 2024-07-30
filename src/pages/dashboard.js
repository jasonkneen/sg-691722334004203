import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';

console.log('Dashboard module is being loaded');

const ErrorFallback = ({ error }) => (
  <div className="text-center text-red-500">
    <h1>Something went wrong:</h1>
    <pre>{error.message}</pre>
  </div>
);

const DashboardContent = () => {
  console.log('DashboardContent is being rendered');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to your Fishing Journal Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a placeholder for your dashboard content.</p>
        <div className="mt-4">
          <LoadingSpinner />
        </div>
      </CardContent>
    </Card>
  );
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