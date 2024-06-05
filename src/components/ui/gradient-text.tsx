"use client";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utils";

const headingVariants = cva(
  "bg-clip-text pb-3 text-transparent tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-neutral-700 to-neutral-800 dark:from-stone-200 dark:to-neutral-200",
        pink: "bg-gradient-to-t from-accent to-accent/90 dark:from-stone-200 dark:to-neutral-200",
        light: "bg-gradient-to-t from-neutral-200 to-neutral-300",
        secondary:
          "bg-gradient-to-t from-primary-foreground to-muted-foreground",
      },
      size: {
        default: "text-2xl lg:text-4xl sm:text-3xl",
        xxs: "text-base lg:text-lg sm:text-lg",
        xs: "text-lg lg:text-2xl sm:text-xl",
        sm: "text-xl lg:text-3xl sm:text-2xl",
        md: "text-2xl lg:text-4xl sm:text-3xl",
        lg: "text-3xl lg:text-5xl sm:text-4xl",
        xl: "text-4xl lg:text-6xl sm:text-5xl",
        xxl: "text-5xl lg:text-[6rem] sm:text-6xl",
        xxxl: "text-5xl lg:text-[8rem] sm:text-6xl",
      },
      weight: {
        default: "font-bold",
        thin: "font-thin",
        base: "font-base",
        semi: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default",
    },
  },
);

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GradientHeading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, variant, weight, size, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3"; // default to 'h3' if not a child
    return (
      <Comp ref={ref} {...props} className={className}>
        <span className={cn(headingVariants({ variant, size, weight }))}>
          {children}
        </span>
      </Comp>
    );
  },
);

GradientHeading.displayName = "GradientHeading";

// Manually define the variant types
export type Variant = "default" | "pink" | "light" | "secondary";
export type Size =
  | "default"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";
export type Weight = "default" | "thin" | "base" | "semi" | "bold" | "black";

export { GradientHeading, headingVariants };
