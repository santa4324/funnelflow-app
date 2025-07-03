import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FunnelsPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Funnels</CardTitle>
          <CardDescription>This is where your saved funnels will appear.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</h3>
            <p className="text-sm text-muted-foreground">Check back later to manage your generated funnels.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
