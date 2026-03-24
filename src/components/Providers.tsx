"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { CacheProvider } from "@/lib/cache";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CacheProvider>{children}</CacheProvider>
    </AuthProvider>
  );
}
