import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      fetchEntries();
    }
  }, [showSplash]);

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setError('Failed to load entries. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to load entries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recent Catches</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={entry.imageUrl || `/api/placeholder/400/300`} alt="Fish" className="w-full h-40 object-cover mb-4 rounded" />
                <p className="text-sm text-muted-foreground mb-2">Location: {entry.location}</p>
                <p className="text-sm text-muted-foreground mb-4">Date: {new Date(entry.date).toLocaleDateString()}</p>
                <Link href={`/entry/${entry.id}`} passHref>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="fixed bottom-4 right-4">
        <Link href="/add-entry" passHref>
          <Button size="lg" className="rounded-full w-16 h-16">
            <span className="text-2xl">+</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}