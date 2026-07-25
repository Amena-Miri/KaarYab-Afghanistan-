"use client";

import { useEffect, useState } from "react";
import { LoadingState } from "@/components/ui/LoadingState";

interface AppLoaderProps {
  children: React.ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingState
        fullScreen
        text="Loading KaarYab Afghanistan..."
      />
    );
  }

  return <>{children}</>;
}