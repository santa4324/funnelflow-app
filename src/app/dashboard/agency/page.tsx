import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AgencyPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Agency Mode</CardTitle>
          <CardDescription>Manage multiple clients and their funnels from a single dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold font-headline">Upgrade to Unlock Agency Features</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our Premium plan allows you to manage up to 3 client accounts, with dedicated analytics and reporting for each. Perfect for marketing agencies and freelancers.</p>
              <Button className="mt-6" disabled>Upgrade to Premium (Coming Soon)</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
