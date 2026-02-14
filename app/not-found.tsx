import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg font-medium">ページが見つかりません</p>
      <p className="mt-2 text-sm text-muted-foreground">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Button asChild className="mt-6 gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          ホームに戻る
        </Link>
      </Button>
    </div>
  )
}
