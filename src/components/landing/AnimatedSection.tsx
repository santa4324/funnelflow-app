'use client';

import React from 'react';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedSection({ children, className }: AnimatedSectionProps) {
  // Animations removed to simplify dependencies and resolve build issues.
  return (
    <section className={className}>
      {children}
    </section>
  );
}
