'use client';

type PayPalButtonsWrapperProps = {
  plan: {
    name: string;
    price: string;
  };
};

export default function PayPalButtonsWrapper({ plan }: PayPalButtonsWrapperProps) {
  return <p className="text-destructive text-center text-sm p-4 bg-destructive/10 rounded-md">Payments are temporarily disabled to ensure build stability. This feature will be back online shortly. Thank you for your patience.</p>;
}
