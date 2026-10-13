import type { Metadata } from "next";

export const metadata: Metadata = { title: "סל קניות" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
