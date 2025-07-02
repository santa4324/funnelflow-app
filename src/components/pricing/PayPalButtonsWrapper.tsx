'use client';

import {
  PayPalScriptProvider,
  PayPalButtons,
  type OnApproveData,
  type OnApproveActions,
  type CreateOrderActions,
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

  if (!paypalClientId || paypalClientId === 'YOUR_PAYPAL_CLIENT_ID_HERE') {
    return <p className="text-destructive text-center text-sm p-4 bg-destructive/10 rounded-md">PayPal is not configured. Please add your Client ID to the .env file.</p>;
  }

  const createOrder = (data: Record<string, unknown>, actions: CreateOrderActions) => {
    console.log('Creating order for plan:', plan.name);
    return actions.order.create({
      purchase_units: [
        {
          description: `FunnelFlow - ${plan.name} Plan`,
          amount: {
            value: plan.price.replace('$', ''),
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('Order approved:', data);
    if (actions.order) {
        const details = await actions.order.capture();
        console.log('Payment successful:', details);
        toast({
            title: 'Payment Successful!',
            description: `You've subscribed to the ${plan.name} plan. Redirecting to dashboard...`,
        });
        router.push('/dashboard');
    } else {
         toast({
            variant: 'destructive',
            title: 'Payment Error',
            description: 'Something went wrong with your payment.',
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
    <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', intent: 'capture' }}>
      <PayPalButtons
        style={{ layout: 'vertical', label: 'pay', height: 48 }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        forceReRender={[plan]}
      />
    </PayPalScriptProvider>
  );
}
