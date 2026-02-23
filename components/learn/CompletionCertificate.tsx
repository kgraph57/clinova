"use client";

import { useCallback, useRef, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { saveCertificate } from "@/lib/storage";

interface CompletionCertificateProps {
  readonly courseId: string;
  readonly courseTitle: string;
  readonly onClose: () => void;
}

export function CompletionCertificate({
  courseId,
  courseTitle,
  onClose,
}: CompletionCertificateProps) {
  const [userName, setUserName] = useState("");
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !userName.trim()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 1200;
    const h = 630;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#fcfcf4");
    gradient.addColorStop(1, "#f5f0e8");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = "#e8e5de";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // Inner border
    ctx.strokeStyle = "#d4d1ca";
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, w - 100, h - 100);

    // Title
    ctx.fillStyle = "#141413";
    ctx.font = "bold 20px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF COMPLETION", w / 2, 140);

    // Decorative line
    ctx.strokeStyle = "#141413";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, 155);
    ctx.lineTo(w / 2 + 100, 155);
    ctx.stroke();

    // Course title
    ctx.fillStyle = "#141413";
    ctx.font = "bold 32px Georgia, serif";
    const lines = wrapText(ctx, courseTitle, w - 200);
    let y = 220;
    for (const line of lines) {
      ctx.fillText(line, w / 2, y);
      y += 42;
    }

    // User name
    ctx.font = "28px Georgia, serif";
    ctx.fillText(userName.trim(), w / 2, y + 40);

    // Date
    const dateStr = new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#666";
    ctx.fillText(dateStr, w / 2, y + 80);

    // Hoshizu branding
    ctx.fillStyle = "#999";
    ctx.font = "14px sans-serif";
    ctx.fillText("Hoshizu \u2014 \u6563\u3089\u3070\u308b\u661f\u3092\u3001\u661f\u5ea7\u306b\u3059\u308b", w / 2, h - 70);

    saveCertificate(courseId, {
      userName: userName.trim(),
      completedAt: Date.now(),
      courseTitle,
    });

    setGenerated(true);
  }, [userName, courseTitle, courseId]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `hoshizu-certificate-${courseId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [courseId]);

  const handleShare = useCallback(() => {
    const text = encodeURIComponent(
      `Hoshizu\u300C${courseTitle}\u300D\u30b3\u30fc\u30b9\u3092\u4fee\u4e86\u3057\u307e\u3057\u305f\uff01\nhttps://kgraph57.github.io/hoshizu/learn`,
    );
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  }, [courseTitle]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">修了証を発行</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!generated ? (
          <div className="mt-6">
            <label
              htmlFor="cert-name"
              className="mb-2 block text-sm font-medium"
            >
              お名前
            </label>
            <Input
              id="cert-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="証明書に表示する名前"
              className="rounded-lg"
            />
            <button
              type="button"
              disabled={!userName.trim()}
              onClick={generate}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              修了証を生成
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <canvas
              ref={canvasRef}
              className="w-full rounded-lg border"
              style={{ aspectRatio: "1200/630" }}
            />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                <Download className="h-4 w-4" />
                ダウンロード
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Share2 className="h-4 w-4" />
                X で共有
              </button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className={generated ? "hidden" : "hidden"} />
      </div>
    </div>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const chars = [...text];
  const lines: string[] = [];
  let current = "";

  for (const char of chars) {
    const test = current + char;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = char;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
