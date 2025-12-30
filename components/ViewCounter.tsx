"use client";

import { useEffect } from "react";

interface ViewCounterProps {
  id: string;
}

export default function ViewCounter({ id }: ViewCounterProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`/api/news/${id}/view`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to increment view count", error);
      }
    };

    incrementView();
  }, [id]);

  return null; // This component doesn't render anything itself
}
