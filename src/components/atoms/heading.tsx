import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('pb-12 scroll-m-20 tracking-tight', {
  variants: {
    size: {
      xs: 'text-xl',
      sm: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl',
    },
    weight: {
      md: 'font-semibold',
      lg: 'font-extrabold',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'md',
  },
});

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: React.ReactNode;
  type?: HeadingType;
  className?: string;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, type = 'h2', size, weight, ...props }, ref) => {
    switch (type) {
      case 'h1':
        return (
          <h1 ref={ref} className={cn(headingVariants({ size, weight }), className)} {...props}>
            {children}
          </h1>
        );
      case 'h2':
      default:
        return (
          <h2 ref={ref} className={cn(headingVariants({ size, weight }), className)} {...props}>
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} className={cn(headingVariants({ size, weight }), className)} {...props}>
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} className={cn(headingVariants({ size, weight }), className)} {...props}>
            {children}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} className={cn(headingVariants({ size, weight }), className)} {...props}>
            {children}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} className={cn(headingVariants({ size, weight }), className)} {...props}>
            {children}
          </h6>
        );
    }
  },
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
