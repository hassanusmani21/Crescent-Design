"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ConsultationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function ConsultationButton({
  children,
  className,
  onClick,
  ...props
}: ConsultationButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={className}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          window.dispatchEvent(
            new CustomEvent("crescent:open-consultation", {
              detail: { source: "manual" },
            }),
          );
        }
      }}
    >
      {children}
    </button>
  );
}
