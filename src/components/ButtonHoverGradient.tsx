"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

import IconComponent from "./IconComponent";
interface ButtonHoverBorderGradientProps {
  label?: string;

  backgroundColor?: string;
  color?: string;
  className?: string;
  icon?: string;
}

const ButtonHoverBorderGradient: React.FC<ButtonHoverBorderGradientProps> = ({
  label,

  className,
  icon,
}) => {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        color="primary"
        className={className}
      >
        {icon ? <IconComponent iconName={icon} size={30} /> : <div></div>}

        <span>{label}</span>
      </HoverBorderGradient>
    </div>
  );
};

export default ButtonHoverBorderGradient;
