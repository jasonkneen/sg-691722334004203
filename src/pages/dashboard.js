import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;