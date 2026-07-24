"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  text = "Loading...",
  className,
  fullScreen = false,
}) => {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        className
      )}
    >
      {/* Logo Animation */}
      <div className="relative flex items-center justify-center">

        {/* Glow Effect */}
        <div
          className="
          absolute
          w-32
          h-32
          rounded-full
          bg-primary/20
          blur-2xl
          animate-pulse
          "
        />


        {/* Animated Border */}
        <div
          className="
          absolute
          w-28
          h-28
          rounded-full
          border-2
          border-primary/30
          animate-spin
          "
        />


        {/* Logo Container */}
        <div
          className="
          relative
          w-24
          h-24
          rounded-3xl
          bg-surface
          border
          border-border
          shadow-lg
          flex
          items-center
          justify-center
          animate-pulse
          "
        >

          <Image
            src="/logo.png"
            width={64}
            height={64}
            alt="KaarYab Logo"
            priority
            className="
            object-contain
            "
          />

        </div>

      </div>


      {/* Text */}
      <div className="text-center">

        <h3
          className="
          text-xl
          font-semibold
          text-text-primary
          "
        >
          {text}
        </h3>


        <p
          className="
          mt-2
          text-sm
          text-text-secondary
          "
        >
          Preparing opportunities for you...
        </p>

      </div>


      {/* Loading Bar */}
      <div
        className="
        w-52
        h-1.5
        rounded-full
        bg-surface-secondary
        overflow-hidden
        "
      >

        <div
          className="
          h-full
          w-1/2
          rounded-full
          bg-primary
          animate-[loading_1.5s_ease-in-out_infinite]
          "
        />

      </div>

    </div>
  );


  if (fullScreen) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-background
        "
      >
        {content}
      </div>
    );
  }


  return content;
};