'use client';
// This hook is temporarily disabled to resolve build issues.
export function useToast() {
  const toast = (options: any) => {
    console.log('Toast:', options.title, options.description);
  };
  return { toast, toasts: [], dismiss: () => {} };
}
export const toast = (options: any) => {
  console.log('Toast:', options.title, options.description);
};
