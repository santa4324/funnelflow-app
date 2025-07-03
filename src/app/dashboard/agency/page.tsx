import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AgencyPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Agency Mode</CardTitle>
          <CardDescription>Manage multiple clients from a single dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</h3>
            <p className="text-sm text-muted-foreground">Agency features will be available for Premium plan users.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
