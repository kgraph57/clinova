import { ProgressProvider } from "@/components/learn/ProgressProvider";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
