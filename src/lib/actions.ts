'use server';

import { redirect } from 'next/navigation';
import { saveLead, ensureDb } from './firestore';
import { z } from 'zod';
import { getFirestore, writeBatch, collection, query, where, getDocs, doc, arrayUnion } from 'firebase/firestore';


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


export async function sendBulkEmail(userId: string, funnelId: string, emailIdentifier: string) {
    if (!userId) {
        return { success: false, message: 'User not authenticated.' };
    }
    try {
        const db = ensureDb();
        const batch = writeBatch(db);
        const leadsRef = collection(db, 'users', userId, 'leads');
        const q = query(leadsRef, where('funnelId', '==', funnelId));
        const querySnapshot = await getDocs(q);

        let leadsCount = 0;
        let alreadySentCount = 0;

        querySnapshot.forEach((leadDoc) => {
            const leadData = leadDoc.data();
            if (leadData.emailsSent?.includes(emailIdentifier)) {
                alreadySentCount++;
            } else {
                const leadRef = doc(db, 'users', userId, 'leads', leadDoc.id);
                batch.update(leadRef, {
                    emailsSent: arrayUnion(emailIdentifier)
                });
                leadsCount++;
            }
        });

        if (leadsCount > 0) {
            await batch.commit();
        }

        return { success: true, message: `Email sent to ${leadsCount} new leads. ${alreadySentCount} had already received it.` };
    } catch (error) {
        console.error("Error sending bulk email:", error);
        return { success: false, message: 'An unexpected error occurred while sending emails.' };
    }
}
