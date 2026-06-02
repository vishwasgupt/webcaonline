import * as React from "react";

export default function DecorativeBlobs() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
      {/* Soft radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent 40%)] mix-blend-overlay" />

      {/* Top-left gradient blob (SVG circle blurred) */}
      <svg
        className="absolute -top-24 -left-24 w-[36rem] h-[36rem] opacity-40 transform rotate-12"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
      >
        <defs>
          <radialGradient id="gTop" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="50%" stopColor="#ffcc9e" />
            <stop offset="100%" stopColor="#ffc4c4" />
          </radialGradient>
          <filter id="bTop" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
        <circle cx="200" cy="200" r="140" fill="url(#gTop)" filter="url(#bTop)" />
      </svg>

      {/* Bottom-right gradient blob (SVG circle blurred) */}
      <svg
        className="absolute -bottom-28 -right-28 w-[44rem] h-[44rem] opacity-32 transform -rotate-12"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
      >
        <defs>
          <radialGradient id="gBottom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="50%" stopColor="#ffd6e0" />
            <stop offset="100%" stopColor="#ffedd5" />
          </radialGradient>
          <filter id="bBottom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="72" />
          </filter>
        </defs>
        <circle cx="250" cy="250" r="180" fill="url(#gBottom)" filter="url(#bBottom)" />
      </svg>
    </div>
  );
}
