import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LeadsPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Leads CRM</CardTitle>
          <CardDescription>Manage your leads and contacts here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold text-muted-foreground">Feature Coming Soon!</h3>
            <p className="text-sm text-muted-foreground">A simple CRM to track your leads will be available here.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
