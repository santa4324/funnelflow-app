'use server';

import { redirect } from 'next/navigation';
import { saveLead, ensureDb, getFunnel } from './firestore';
import { z } from 'zod';
import { getFirestore, writeBatch, collection, query, where, getDocs, doc, arrayUnion } from 'firebase/firestore';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

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

    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN;

    if (!mailgunApiKey || !mailgunDomain || mailgunApiKey.includes('YOUR_')) {
        return { success: false, message: 'Mailgun is not configured. Please add API key and domain to .env file.' };
    }

    try {
        const db = ensureDb();

        const funnel = await getFunnel(userId, funnelId);
        if (!funnel) {
            return { success: false, message: 'Funnel not found.' };
        }

        const emailIndex = parseInt(emailIdentifier.split('-')[1]);
        const emailToSend = funnel.generatedContent.emailSequence[emailIndex];

        if (!emailToSend) {
            return { success: false, message: 'Email content not found.' };
        }
        
        const leadsRef = collection(db, 'users', userId, 'leads');
        const q = query(leadsRef, where('funnelId', '==', funnelId));
        const querySnapshot = await getDocs(q);

        const leadsToSendTo = querySnapshot.docs.filter(doc => !doc.data().emailsSent?.includes(emailIdentifier));
        const recipientEmails = leadsToSendTo.map(doc => doc.data().email);

        if (recipientEmails.length === 0) {
            return { success: true, message: 'All leads for this funnel have already received this email.' };
        }
        
        // Initialize Mailgun client
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: mailgunApiKey,
        });

        const messageData = {
            from: `The ${funnel.businessInfo.businessName} Team <noreply@${mailgunDomain}>`,
            to: recipientEmails,
            subject: emailToSend.subject,
            text: emailToSend.body,
        };

        // Send email via Mailgun
        await mg.messages.create(mailgunDomain, messageData);
        
        // If sending was successful, update the database
        const batch = writeBatch(db);
        leadsToSendTo.forEach(leadDoc => {
            const leadRef = doc(db, 'users', userId, 'leads', leadDoc.id);
            batch.update(leadRef, {
                emailsSent: arrayUnion(emailIdentifier)
            });
        });
        await batch.commit();

        return { success: true, message: `Email successfully sent to ${recipientEmails.length} lead(s).` };

    } catch (error: any) {
        console.error("Error sending bulk email via Mailgun:", error);
        return { success: false, message: error.message || 'An unexpected error occurred while sending emails.' };
    }
}
