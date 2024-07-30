import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EntryView() {
  const router = useRouter();
  const { id } = router.query;

  // Mock data - replace with actual data fetching
  const entry = {
    id,
    title: `Catch #${id}`,
    weight: 5.2,
    location: 'Lake Example',
    date: new Date().toLocaleDateString(),
    notes: 'It was a great day for fishing!',
    tags: ['sunny', 'bass', 'lure'],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{entry.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={`/api/placeholder/800/600`} alt="Fish" className="w-full h-64 object-cover mb-4 rounded" />
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
              <p>{entry.date}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Notes:</p>
            <p>{entry.notes}</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
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
          <Button variant="outline">Back to List</Button>
        </Link>
        <Link href={`/edit-entry/${id}`} passHref>
          <Button>Edit Entry</Button>
        </Link>
      </div>
    </div>
  );
}