import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import "./theme-config.css";
import AuthProvider from "./api/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryClientProvider>

        <AuthProvider>
          <Theme accentColor="amber">
            <header>
              <NavBar />
            </header>
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
