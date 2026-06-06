'use client';

import { cn } from '@/lib/utils';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useMemo } from 'react';

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
  /** Semantic wrapper element, e.g. 'h1' for the page heading. Defaults to 'div'. */
  as?: React.ElementType;
}
const BlurFadeText = ({
  text,
  className,
  variant,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
  as: Wrapper = 'div',
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: 'blur(8px)' },
    visible: { y: -yOffset, opacity: 1, filter: 'blur(0px)' },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);
  const shouldReduceMotion = useReducedMotion();

  // Reduced motion: render the text statically and fully visible.
  if (shouldReduceMotion) {
    return (
      <Wrapper className={cn('inline-block', className)} data-blur-fade>
        {text}
      </Wrapper>
    );
  }

  if (animateByCharacter) {
    return (
      <Wrapper className="flex">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            data-blur-fade
            initial="hidden"
            animate="visible"
            variants={combinedVariants}
            transition={{
              delay: delay + i * characterDelay,
              ease: 'easeOut',
            }}
            className={cn('inline-block', className)}
            style={{ width: char.trim() === '' ? '0.2em' : 'auto' }}
          >
            {char}
          </motion.span>
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper className="flex">
      <motion.span
        data-blur-fade
        initial="hidden"
        animate="visible"
        variants={combinedVariants}
        transition={{
          delay,
          ease: 'easeOut',
        }}
        className={cn('inline-block', className)}
      >
        {text}
      </motion.span>
    </Wrapper>
  );
};

export default BlurFadeText;
