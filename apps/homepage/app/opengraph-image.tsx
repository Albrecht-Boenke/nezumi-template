import { ImageResponse } from "next/og"

export const alt = "Nezumi"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #121014 0%, #1a181c 58%, #47585c 100%)",
          color: "#faf9f5",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 0,
            marginBottom: 16,
          }}
        >
          Nezumi
        </div>
        <div style={{ fontSize: 28, opacity: 0.92 }}>Öffentliche Website</div>
      </div>
    ),
    {
      ...size,
    },
  )
}
