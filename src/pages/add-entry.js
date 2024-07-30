import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AddEntry() {
  const router = useRouter();
  const { toast } = useToast();
  const [entry, setEntry] = useState({
    title: '',
    weight: '',
    location: '',
    date: '',
    notes: '',
    tags: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to create entry');
      }

      toast({
        title: "Success",
        description: "Entry added successfully!",
      });
      router.push('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <CardTitle>Add New Catch</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={entry.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input id="weight" name="weight" type="number" step="0.1" value={entry.weight} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={entry.location} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={entry.date} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" value={entry.notes} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={entry.tags.join(', ')}
                onChange={(e) => setEntry((prev) => ({ ...prev, tags: e.target.value.split(',').map((tag) => tag.trim()) }))}
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push('/')} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}