"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

type FlipAvatarProps = {
  src: string;
  alt: string;
  vcard: string;
  variant?: "avatar" | "portrait";
};

export function FlipAvatar({ src, alt, vcard, variant = "avatar" }: FlipAvatarProps) {
  const [flipped, setFlipped] = useState(false);
  const isPortrait = variant === "portrait";

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={flipped ? "Show profile photo" : "Show QR code to save contact"}
      title={flipped ? "Tap to show photo" : "Tap to reveal contact QR code"}
      className={
        isPortrait
          ? "relative mx-auto aspect-[11/14] w-full max-w-sm cursor-pointer perspective-[1200px] sm:mx-0"
          : "relative h-40 w-40 cursor-pointer perspective-[900px] sm:h-44 sm:w-44"
      }
    >
      {isPortrait && (
        <div aria-hidden="true" className="absolute -right-4 -bottom-4 h-full w-full bg-accent" />
      )}
      <div
        className={`relative h-full w-full transition-transform duration-700 transform-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className={`absolute inset-0 overflow-hidden bg-[var(--ui-bg-elevated)] backface-hidden ${
            isPortrait ? "" : "rounded-2xl"
          }`}
        >
          {isPortrait ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={176}
              height={176}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>
        {/* QR codes need a light background to scan reliably, so the back stays white in dark mode too. */}
        <div
          className={`absolute inset-0 rotate-y-180 bg-white p-4 shadow-md backface-hidden ${
            isPortrait ? "" : "rounded-2xl"
          }`}
        >
          <QRCodeSVG
            value={vcard}
            level="M"
            bgColor="#ffffff"
            fgColor="#171310"
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  );
}
