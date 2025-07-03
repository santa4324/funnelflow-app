import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Help & Support</CardTitle>
          <CardDescription>Find answers to common questions and get help.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold text-muted-foreground">Content Coming Soon!</h3>
            <p className="text-sm text-muted-foreground">Our help center and support contact information will be here.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
