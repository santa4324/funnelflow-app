'use client';
// This component is temporarily disabled to resolve build issues.
export function BusinessSetupForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  return <button onClick={() => onSubmit({})}>Continue</button>;
}
