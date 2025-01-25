"use client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
interface CloudinaryUploadProps {
  src: string; // Main image source
  fallbackSrc: string; // Fallback image source
  width?: number;
  height?: number;
  alt?: string;
  class_names?: string;
  onError?: () => void;
}
// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  src,
  fallbackSrc,
  width,
  height,
  alt,
  class_names,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageSrc, setImageSrc] = useState<string>(src);
  if (!src) {
    src = "image-placeholder_pvbgme";
  }

  return (
    <CldImage
      src={src} // Use this sample image or upload your own via the Media Explorer
      width={width} // Transform the image: auto-crop to square aspect_ratio
      height={height}
      alt={alt || ""}
      className={class_names}
      onError={() => setImageSrc(fallbackSrc)}
      crop={{
        type: "auto",
        source: true,
      }}
    />
  );
};
export default CloudinaryUpload;
