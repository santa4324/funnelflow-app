'use client';

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    // In a production environment, you might want to log a warning
    // that the GA ID is missing. For now, we'll just not render the component.
    return null;
  }

  return <NextGoogleAnalytics gaId={gaId} />;
}
