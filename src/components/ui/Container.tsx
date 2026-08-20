import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "full";
}

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const sizes: Record<
    "default" | "wide" | "full",
    string
  > = {
    default: "max-w-7xl",
    wide: "max-w-[1500px]",
    full: "max-w-none",
  };

  return (
    <div
      className={`
        relative
        mx-auto
        w-full
        ${sizes[size]}
        px-5
        sm:px-6
        lg:px-8
        xl:px-10
        ${className}
      `}
    >
      {children}
    </div>
  );
}