"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const buttonVariantsOuter = cva("", {
	variants: {
		variant: {
			primary:
				"border border-primary/10 bg-gradient-to-b from-primary/70 to-primary p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-primary dark:from-white dark:to-white/80",
			accent: "border-[1px] border-black/10 bg-gradient-to-b from-indigo-300/90 to-indigo-500 p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-neutral-950 dark:from-indigo-200/70 dark:to-indigo-500",
			destructive:
				"border-[1px] border-black/10 bg-gradient-to-b from-red-300/90 to-red-500 p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-neutral-950 dark:from-red-300/90 dark:to-red-500",
			secondary:
				"border-[1px] border-black/20 bg-white/50 p-[1px] transition duration-300 ease-in-out dark:border-[2px] dark:border-neutral-950 dark:bg-neutral-600/50",
			minimal:
				"group border-[1px] border-black/20 bg-white/50 to-white p-[1px] dark:border-[2px] dark:border-neutral-950 active:bg-neutral-200 dark:active:bg-neutral-800 dark:bg-neutral-600/80 hover:bg-gradient-to-t dark:hover:from-neutral-600/50 hover:from-neutral-100 dark:hover:to-neutral-600/70",
			icon: "group rounded-full border border-black/10 bg-white/50 to-white p-[1px] dark:border-neutral-950 active:bg-neutral-200 dark:active:bg-neutral-800 dark:bg-neutral-600/50 hover:bg-gradient-to-t dark:hover:from-neutral-700 hover:from-neutral-100 dark:hover:to-neutral-600",
		},
		size: {
			sm: "rounded-[calc(var(--radius)-2px)]",
			default: "rounded-[var(--radius)]",
			lg: "rounded-[calc(var(--radius)+2px)]",
			icon: "rounded-full",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

const innerDivVariants = cva(
	"flex h-full w-full items-center justify-center text-muted-foreground duration-300 ease-in-out",
	{
		variants: {
			variant: {
				primary:
					"gap-2 bg-gradient-to-b from-primary/80 to-primary text-sm text-white/90 transition active:bg-gradient-to-b active:from-primary hover:from-primaery/80 active:to-primary hover:to-primary/60",
				accent: "gap-2 bg-gradient-to-b from-indigo-400 to-indigo-600 text-sm text-white/90 transition active:bg-gradient-to-b hover:bg-gradient-to-b active:from-indigo-400/80 dark:active:from-indigo-400 dark:hover:from-indigo-400/70 hover:from-indigo-400/70 active:to-indigo-600/80 dark:active:to-indigo-600 dark:hover:to-indigo-600/70 hover:to-indigo-600/70",
				destructive:
					"gap-2 bg-gradient-to-b from-red-400/60 to-red-500/60 text-sm text-white/90 transition active:bg-gradient-to-b hover:bg-gradient-to-b active:from-red-400/80 dark:active:from-red-400 dark:hover:from-red-400/70 hover:from-red-400/70 active:to-red-600/80 dark:active:to-red-500 dark:hover:to-red-500/80 hover:to-red-600/70",
				secondary:
					"bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 text-sm transition active:bg-gradient-to-b hover:bg-gradient-to-b active:from-neutral-200/60 dark:active:from-neutral-800 dark:from-neutral-800 dark:hover:from-neutral-700 hover:from-neutral-200/40 active:to-neutral-300/70 dark:active:to-neutral-700 dark:hover:to-neutral-700/60 dark:to-neutral-700/50 hover:to-neutral-300/60",
				minimal:
					"bg-gradient-to-b from-white to-neutral-50/50 text-sm transition group-active:bg-gradient-to-b group-hover:bg-gradient-to-b dark:from-neutral-800 dark:group-active:from-neutral-800 dark:group-hover:from-neutral-700 group-active:from-neutral-100/60 group-hover:from-neutral-50/50 dark:group-active:to-neutral-700 dark:group-hover:to-neutral-700/60 dark:to-neutral-700/50 group-active:to-neutral-100/90 group-hover:to-neutral-100/60",
				icon: "rounded-full bg-gradient-to-b from-white to-neutral-50/50 dark:group-active:bg-neutral-800 group-active:bg-neutral-200 dark:from-neutral-800 dark:to-neutral-700/50",
			},
			size: {
				sm: "w-full rounded-sm px-4 py-1 text-xs",
				default: "h-9 w-full rounded-md px-4 text-sm",
				lg: "h-10 w-full rounded-lg px-4 text-base",
				icon: "rounded-full p-1",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface UnifiedButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "destructive"
		| "minimal"
		| "icon";
	size?: "default" | "sm" | "lg" | "icon";
	asChild?: boolean;
}

const TextureButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
	(
		{
			children,
			variant = "primary",
			size = "default",
			asChild = false,
			className,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				className={cn(
					buttonVariantsOuter({ variant, size }),
					className,
				)}
				ref={ref}
				{...props}
			>
				<div className={cn(innerDivVariants({ variant, size }))}>
					{children}
				</div>
			</Comp>
		);
	},
);

TextureButton.displayName = "TextureButton";

export { TextureButton };

// export TextureButton
