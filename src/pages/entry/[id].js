import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Edit, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function EntryView() {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchEntry();
    }
  }, [id]);

  const fetchEntry = async () => {
    try {
      console.log(`Fetching entry with id: ${id}`);
      const response = await fetch(`/api/entries/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Entry not found');
        }
        throw new Error('Failed to fetch entry');
      }
      const data = await response.json();
      console.log('Entry data:', data);
      setEntry(data);
    } catch (error) {
      console.error('Error fetching entry:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
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
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={entry.imageUrl || `/api/placeholder/800/600`} alt="Fish" className="w-full h-64 object-cover mb-4 rounded" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Weight:</p>
              <p>{entry.weight} lbs</p>
            </div>
            <div>
              <p className="font-semibold">Location:</p>
              <p>{entry.location}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{new Date(entry.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Notes:</p>
            <p>{entry.notes}</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {entry.tags && entry.tags.map((tag) => (
                <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-between">
        <Link href="/" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Button>
        </Link>
        <Link href={`/edit-entry/${id}`} passHref>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Entry
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}