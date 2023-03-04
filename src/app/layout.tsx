import "styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
