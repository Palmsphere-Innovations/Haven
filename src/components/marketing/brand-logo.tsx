import React from "react";

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <svg
      className={`${className} fill-brand`}
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 48V28.5L38 12L60 28.5V48H47V35C47 30.0294 42.9706 26 38 26C33.0294 26 29 30.0294 29 35V48H16Z"
        fill="#132A20"
      />
      <circle cx="38" cy="20" r="3" fill="#132A20" />
      <text
        x="78"
        y="44"
        fill="#132A20"
        fontFamily="Inter, sans-serif"
        fontSize="34"
        fontWeight="600"
        letterSpacing="-0.8px"
      >
        Haven
      </text>
    </svg>
  );
};