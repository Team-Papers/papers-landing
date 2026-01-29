import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, className, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
