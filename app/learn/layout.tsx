import { ProgressProvider } from "@/components/learn/ProgressProvider";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
