"use client"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useFlipTransition() {
  const router = useRouter();
  const params = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const startedFlipped = true;
  const seed = params?.get("seed") ? Number(params.get("seed")) : undefined;

  const handleNavigate = (href: string) => {
    const newSeed = Math.floor(Math.random() * 1e9);
    setIsNavigating(true);

    setTimeout(() => {
      router.push(`${href}?seed=${newSeed}`);
    }, 800);
  };

  return { isNavigating, handleNavigate, startedFlipped, seed } as const;
}
