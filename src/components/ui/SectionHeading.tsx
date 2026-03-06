import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, className, align = "center", light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-14", align === "center" && "text-center", className)}>
      <h2 className={cn(
        "font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
        light ? "text-white" : "text-on-surface"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg max-w-2xl",
          align === "center" && "mx-auto",
          light ? "text-white/70" : "text-on-surface-variant"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
