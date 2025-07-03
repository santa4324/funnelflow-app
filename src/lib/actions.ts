'use server';

import { redirect } from 'next/navigation';
import { saveLead } from './firestore';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  funnelId: z.string(),
  userId: z.string(),
});

export type FormState = {
    message: string;
    success: boolean;
};

export async function captureLead(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = leadSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    funnelId: formData.get('funnelId'),
    userId: formData.get('userId'),
  });

  if (!parsed.success) {
    return {
        success: false,
        message: parsed.error.errors.map(e => e.message).join(', ')
    };
  }

  try {
    const { userId, funnelId, name, email } = parsed.data;
    await saveLead(userId, funnelId, name, email);
  } catch (e) {
    console.error(e);
    return { success: false, message: 'An unexpected error occurred.' };
  }

  redirect(`/v/${parsed.data.funnelId}/thanks`);
}
