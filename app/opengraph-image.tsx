import { ImageResponse } from "next/og";

// Image metadata
export const alt = "James Dimonaco - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// ============================================
// UPDATE THIS WHEN YOU MOVE TO A NEW LOCATION
// ============================================
const CURRENT_LOCATION = "Colombia";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "40px 80px",
        }}
      >
        {/* Laptop Icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 32 32"
          style={{ marginBottom: "30px" }}
        >
          <rect
            x="4"
            y="6"
            width="24"
            height="16"
            rx="2"
            fill="#1a1a1a"
            stroke="#eab308"
            strokeWidth="2"
          />
          <rect x="7" y="9" width="18" height="10" rx="1" fill="#eab308" opacity="0.2" />
          <rect x="9" y="11" width="8" height="2" rx="1" fill="#eab308" />
          <rect x="9" y="15" width="12" height="2" rx="1" fill="#eab308" opacity="0.6" />
          <path
            d="M2 24 L4 22 L28 22 L30 24 L30 26 C30 27.1 29.1 28 28 28 L4 28 C2.9 28 2 27.1 2 26 Z"
            fill="#1a1a1a"
            stroke="#eab308"
            strokeWidth="2"
          />
        </svg>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          James Dimonaco
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 32,
            color: "#eab308",
            marginBottom: "30px",
          }}
        >
          Full Stack Developer
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            color: "#a1a1aa",
            fontSize: 20,
          }}
        >
          <span>8 years experience</span>
          <span style={{ color: "#52525b" }}>•</span>
          <span>Currently in {CURRENT_LOCATION}</span>
          <span style={{ color: "#52525b" }}>•</span>
          <span style={{ color: "#22c55e" }}>Available for hire</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
