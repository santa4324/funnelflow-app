'use client';

import {
  PayPalScriptProvider,
  PayPalButtons,
  type OnApproveData,
  type OnApproveActions,
  type CreateSubscriptionActions,
} from '@paypal/react-paypal-js';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getFirestore, doc, setDoc, type Firestore } from 'firebase/firestore';
import { app, isFirebaseConfigured } from '@/lib/firebase';

type PayPalButtonsWrapperProps = {
  plan: {
    name: string;
    price: string;
  };
};

const db: Firestore | undefined = isFirebaseConfigured && app ? getFirestore(app) : undefined;

export default function PayPalButtonsWrapper({ plan }: PayPalButtonsWrapperProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const starterPlanId = process.env.NEXT_PUBLIC_PAYPAL_STARTER_PLAN_ID;
  const premiumPlanId = process.env.NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID;

  if (!paypalClientId || paypalClientId.includes('YOUR_')) {
    return <p className="text-destructive text-center text-sm p-4 bg-destructive/10 rounded-md">PayPal is not configured. Please add your Client ID to the .env file.</p>;
  }
  
  const planId = plan.name === 'Starter' ? starterPlanId : premiumPlanId;
  
  if (!planId || planId.includes('YOUR_')) {
    return <p className="text-destructive text-center text-sm p-4 bg-destructive/10 rounded-md">The {plan.name} plan is not configured for subscriptions. Please add the Plan ID to the .env file.</p>;
  }

  const createSubscription = (data: Record<string, unknown>, actions: CreateSubscriptionActions) => {
    console.log('Creating subscription for plan:', plan.name);
    return actions.subscription.create({
      plan_id: planId,
    });
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('Subscription approved:', data);
    
    if (!db) {
        toast({
            variant: 'destructive',
            title: 'Database Error',
            description: 'Your payment was successful, but the database is not configured. Please contact support.',
        });
        return;
    }

    if (user) {
        const userRef = doc(db, 'users', user.uid);
        try {
            await setDoc(userRef, {
                subscription: {
                    planName: plan.name,
                    subscriptionId: data.subscriptionID,
                    status: 'active',
                    startDate: new Date(),
                }
            }, { merge: true });
            
            toast({
                title: 'Payment Successful!',
                description: `You've subscribed to the ${plan.name} plan. Redirecting to dashboard...`,
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error saving subscription to database:', error);
            toast({
                variant: 'destructive',
                title: 'Database Error',
                description: 'Your payment was successful, but we failed to update your account. Please contact support.',
            });
        }
    } else {
         toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: 'You must be logged in to complete a purchase.',
        });
    }
  };

  const onError = (err: any) => {
    console.error('PayPal Error:', err);
    toast({
      variant: 'destructive',
      title: 'Payment Error',
      description: 'Something went wrong with your payment. Please try again.',
    });
  };

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', intent: 'subscription', vault: true }}>
      <PayPalButtons
        style={{ layout: 'vertical', label: 'subscribe', height: 48 }}
        createSubscription={createSubscription}
        onApprove={onApprove}
        onError={onError}
        forceReRender={[plan]}
      />
    </PayPalScriptProvider>
  );
}
