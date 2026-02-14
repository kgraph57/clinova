import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Clinova - 医療従事者のためのAIナレッジポータル"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d9488 0%, #06b6d4 50%, #0891b2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "white",
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Clinova
          </span>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          医療AI、体系的に。
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.8)",
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          プロンプト・ワークフロー・学習コースを1箇所に集約
        </div>
      </div>
    ),
    { ...size },
  )
}
