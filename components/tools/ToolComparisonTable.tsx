import { Check, X, ExternalLink } from "lucide-react";
import type { AITool } from "./ToolComparisonContent";

interface ToolComparisonTableProps {
  readonly tools: readonly AITool[];
}

export function ToolComparisonTable({ tools }: ToolComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="sticky left-0 bg-muted/50 px-4 py-3 text-left font-medium">
              ツール名
            </th>
            <th className="px-4 py-3 text-left font-medium">ベンダー</th>
            <th className="px-4 py-3 text-left font-medium">料金</th>
            <th className="px-4 py-3 text-center font-medium">HIPAA</th>
            <th className="px-4 py-3 text-center font-medium">日本語</th>
            <th className="px-4 py-3 text-center font-medium">医療認証</th>
            <th className="px-4 py-3 text-center font-medium">リンク</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id} className="border-b last:border-b-0">
              <td className="sticky left-0 bg-card px-4 py-3 font-medium">
                {tool.name}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {tool.vendor}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {tool.pricing}
              </td>
              <td className="px-4 py-3 text-center">
                {tool.hipaaCompliant ? (
                  <Check className="mx-auto h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {tool.japaneseSupport ? (
                  <Check className="mx-auto h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
                )}
              </td>
              <td className="max-w-[200px] truncate px-4 py-3 text-center text-xs text-muted-foreground">
                {tool.medicalCertification ?? "—"}
              </td>
              <td className="px-4 py-3 text-center">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="mx-auto h-4 w-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
