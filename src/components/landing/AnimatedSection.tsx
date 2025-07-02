'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
