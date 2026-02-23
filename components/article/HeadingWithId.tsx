import { slugify } from "@/lib/toc";
import type { ReactNode } from "react";

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function H2({ children }: { readonly children?: ReactNode }) {
  const text = extractText(children);
  const id = slugify(text);
  return <h2 id={id}>{children}</h2>;
}

export function H3({ children }: { readonly children?: ReactNode }) {
  const text = extractText(children);
  const id = slugify(text);
  return <h3 id={id}>{children}</h3>;
}
