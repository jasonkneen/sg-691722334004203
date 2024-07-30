import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, PlusCircle } from "lucide-react";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchEntries();
  }, []);

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
        description: "Failed to load entries. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recent Catches</h1>
      {entries.length === 0 ? (
        <div className="text-center text-muted-foreground">No entries found. Add your first catch!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
        <Link href="/add-entry" passHref>
          <Button size="lg" className="rounded-full w-16 h-16">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}