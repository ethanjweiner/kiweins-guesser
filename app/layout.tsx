import type { Metadata } from "next";
import { Coiny, Inter } from "next/font/google";
import "./globals.css";
import { SkeletonTheme } from "react-loading-skeleton";

const coiny = Coiny({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiwi Kiz",
  description: "Some lil quizzes for the cutest Kiwi ever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SkeletonTheme>
        <body className={coiny.className}>{children}</body>
      </SkeletonTheme>
    </html>
  );
}
