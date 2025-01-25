"use client";
import { useState } from "react";
import { ImageProps } from "next/image";
import CloudinaryUpload from "./CloudinaryUpload";

interface ImageWithFallbackProps extends ImageProps {
  src: string; // Main image source
  fallbackSrc: string; // Fallback image source
  width?: number;
  height?: number;
  alt: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  width,
  height,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);

  return (
    <CloudinaryUpload
      onError={() => setImageSrc(fallbackSrc)}
      src={imageSrc}
      fallbackSrc={fallbackSrc}
      width={width}
      height={height}
    />
  );
}
