"use client";

import type React from "react";
import { theme } from "@/lib/theme";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ variant = "primary", style, ...props }: Props) {
  const isPrimary = variant === "primary";

  return (
    <button
      {...props}
      style={{
        padding: "10px 12px",
        borderRadius: theme.radius.md,
        border: isPrimary ? "none" : `1px solid ${theme.colors.border}`,
        background: isPrimary ? theme.colors.primary : "transparent",
        color: isPrimary ? "white" : theme.colors.text,
        fontWeight: 800,
        opacity: props.disabled ? 0.6 : 1,
        ...style,
      }}
    />
  );
}