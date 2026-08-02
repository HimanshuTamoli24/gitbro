import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./global.css";
import { TRPCProvider } from "~/trpc/TRPCProvider";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Gitbro - Workspace",
  description: "Type-Safe GitHub Management Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
