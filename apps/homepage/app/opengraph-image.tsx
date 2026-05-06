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
          background: "linear-gradient(145deg, #0f172a 0%, #1e3a5f 55%, #2563eb 100%)",
          color: "#f8fafc",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.04em",
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
