"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      onUpdate(v) {
        setDisplay(
          Number.isInteger(value)
            ? Math.floor(v).toLocaleString("fr-FR")
            : v.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        );
      },
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}
