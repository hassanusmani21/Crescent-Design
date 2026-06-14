import type { ReactNode } from "react";

type LinkArrowProps = {
  children: ReactNode;
  className?: string;
};

export function LinkArrow({ children, className }: LinkArrowProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <span>{children}</span>
      <span aria-hidden="true" className="link-arrow text-[0.9em]">
        {"->"}
      </span>
    </span>
  );
}
