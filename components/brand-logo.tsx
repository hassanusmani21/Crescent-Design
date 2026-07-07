type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export function BrandLogo({ className = "", markClassName = "", textClassName = "" }: BrandLogoProps) {
  return (
    <span className={`brand-logo ${className}`}>
      <svg
        className={`brand-logo__mark ${markClassName}`}
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="32" cy="32" r="25" />
        <path d="M32 9v46" />
        <path d="M29.2 14.5a20.5 20.5 0 0 0 0 35" />
        <path d="M34 31.2 44 23l11 9.2V46H46V36H38v10h-4Z" />
        <rect x="22" y="28" width="5.5" height="5.5" />
        <rect x="29" y="28" width="5.5" height="5.5" />
        <rect x="22" y="35" width="5.5" height="5.5" />
        <rect x="29" y="35" width="5.5" height="5.5" />
      </svg>
      <span className={`brand-logo__text ${textClassName}`}>Crescent Design</span>
    </span>
  );
}
