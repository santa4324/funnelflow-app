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

type PayPalButtonsWrapperProps = {
  plan: {
    name: string;
    price: string;
  };
};

export default function PayPalButtonsWrapper({ plan }: PayPalButtonsWrapperProps) {
  const { toast } = useToast();
  const router = useRouter();
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
    toast({
        title: 'Payment Successful!',
        description: `You've subscribed to the ${plan.name} plan. Redirecting to dashboard...`,
    });
    // The subscription is active on PayPal's side.
    // Here you would typically save the subscription ID (data.subscriptionID) to your database, associated with the user.
    console.log('Subscription ID:', data.subscriptionID);
    router.push('/dashboard');
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
