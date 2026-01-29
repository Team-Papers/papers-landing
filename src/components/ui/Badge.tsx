import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "free";
}

export default function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-primary/10 text-primary",
        variant === "success" && "bg-secondary/10 text-secondary",
        variant === "free" && "bg-accent/20 text-amber-700",
        className
      )}
    >
      {children}
    </span>
  );
}
