"use client";
import React from "react";
import { IconType } from "react-icons";

import AppIcons from "./ui/AppIcons";
import Chip from "@mui/material/Chip";

interface IconComponentProps {
  iconName?: string;
  size?: number;
  class_name?: string;
  color?: string;
  showLabel?: boolean;
  customIcon?: IconType | null;
}

const IconComponent: React.FC<IconComponentProps> = ({
  iconName,
  size,
  class_name,
  color,
  showLabel,
  customIcon: CustomIcon,
}) => {
  if (!iconName) {
    iconName = "ban";
  } else {
    iconName = iconName.toLowerCase();
  }

  const Icon = AppIcons[iconName];

  if (!size) {
    size = 18;
  }
  if (!class_name) {
    class_name = "block mx-auto";
  }
  return (
    <>
      {Icon && !CustomIcon && (
        <Chip
          variant="outlined"
          icon={
            <Icon
              color={color}
              aria-valuetext={iconName}
              aria-label={iconName}
              title={iconName}
            />
          }
          label={showLabel ? iconName : undefined}
          className={`text-center mx-auto ${!showLabel ? "border-0 p-0" : ""}`}
        />
      )}
      {CustomIcon && (
        <div className={class_name}>
          <CustomIcon size={size} color={color} />
        </div>
      )}
      {!Icon && <Chip label={iconName} variant="outlined" />}
    </>
  );
};

export default IconComponent;
