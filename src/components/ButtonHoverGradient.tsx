"use client";
import React, { MouseEvent } from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

import IconComponent from "./IconComponent";
interface ButtonHoverBorderGradientProps {
  label?: string;
  onClick?: (event: MouseEvent) => void;
  backgroundColor?: string;
  color?: string;
  className?: string;
  icon?: string;
}

const ButtonHoverBorderGradient: React.FC<ButtonHoverBorderGradientProps> = ({
  label,
  onClick,

  className,
  icon,
}) => {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        color="primary"
        onClick={() => onClick}
        className={className}
      >
        {icon ? <IconComponent iconName={icon} size={30} /> : <div></div>}

        <span>{label}</span>
      </HoverBorderGradient>
    </div>
  );
};

export default ButtonHoverBorderGradient;
