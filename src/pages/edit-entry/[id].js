import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function EditEntry() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEntry();
    }
  }, [id]);

  const fetchEntry = async () => {
    try {
      const response = await fetch(`/api/entries/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch entry');
      }
      const data = await response.json();
      setEntry({
        ...data,
        date: new Date(data.date).toISOString().split('T')[0],
        tags: data.tags.map(tag => tag.name).join(', '),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...entry,
          tags: entry.tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      toast({
        title: "Success",
        description: "Entry updated successfully!",
      });
      router.push(`/entry/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update entry. Please try again.",
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

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Catch</CardTitle>
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
                value={entry.tags}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push(`/entry/${id}`)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Update Entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}