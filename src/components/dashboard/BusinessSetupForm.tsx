'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { BusinessInfo } from '@/lib/types';

const businessInfoSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  industry: z.string().min(2, { message: 'Industry must be at least 2 characters.' }),
  targetAudience: z.string().min(10, { message: 'Target audience description must be at least 10 characters.' }),
  offer: z.string().min(10, { message: 'Offer description must be at least 10 characters.' }),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  socialUrls: z.string().optional(),
});

type BusinessSetupFormProps = {
  onSubmit: (data: BusinessInfo) => void;
  initialData?: BusinessInfo | null;
};

export function BusinessSetupForm({ onSubmit, initialData }: BusinessSetupFormProps) {
  const form = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: initialData || {
      businessName: '',
      industry: '',
      targetAudience: '',
      offer: '',
      websiteUrl: '',
      socialUrls: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Acme Coaching" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry / Niche</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Health & Wellness Coaching" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Busy professionals aged 30-45 looking to improve their work-life balance." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offer / Lead Magnet</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., A free 5-day email course on mindfulness techniques." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialUrls"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media URLs (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., https://linkedin.com/in/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
            <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Form>
  );
}
